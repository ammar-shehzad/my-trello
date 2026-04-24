"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { todo } from "node:test";

export default function Home() {
  let [task, setTask] = useState<{ newTask: any; category: any }>({newTask:"",category:""});
  let [task2, setTask2] = useState<{ newTask: any; category: any }>({
    newTask: "",
    category: "",
  });

  let [todos, setTodos] = useState<
    { task: string; period: string; isDone: boolean; id: any }[]
  >([]);
  let [todos1, setTodos1] = useState<
    { task: string; period: string; isDone: boolean }[]
  >([]);
  let [cardName, setCardName] = useState<{ name: string }>({ name: "" });
  let [cards, setCards] = useState<{ name: string; color: any }[]>([
    { name: "today", color: "#533F04" },
    { name: "this week", color: "#19573D" },
    { name: "later", color: "#101204" },
  ]);
  let [err, setErr] = useState("");
  let [err2, setErr2] = useState("");
  let [isCollapse, setIsCollapse] = useState<boolean>(true);
  let [isActiveId, setIsActiveId] = useState<string | null>(null);
  let [editTask, setEditTask] = useState<{
    task: string;
    period: string;
    id: any;
  }>({ task: "", period: "", id: "" });

  let TodayTask = todos.filter((todos) => todos.period == "today");
  let LaterTask = todos.filter((todos) => todos.period == "later");
  let thisweekTask = todos.filter((todos) => todos.period == "this week");

  let modal=document.getElementById("taskmodel") as HTMLDialogElement;

  let taskEditmodel=document.getElementById(
    "taskEditmodel",
  ) as HTMLDialogElement;

  modal?.addEventListener('click',e=>{
    if(e.target==modal) modal.close()
  })

  taskEditmodel?.addEventListener('click',e=>{
    if(e.target==taskEditmodel) taskEditmodel.close()
  })



// taskEditmodel.addEventListener('click',()=>{

// taskEditmodel.close()
// })



  let handleInputChange = (e: any) => {
    let { name, value } = e.target;

    setTask((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    console.log(task);
  };

  const handleTaskSubmit = () => {
   if(task.newTask!=""){
        setTodos((prev: any) => {
      return [
        ...prev,
        {
          id: Date.now(),
          task: task?.newTask,
          period: task?.category,
          isDone: false,
        },
      ];
    });
    toast.success("Task Added Successfully")
   }else{
    toast.error("Fill The Feild")
   }

  };

  const handleInputCardChange = (e: any) => {
    setCardName({ name: e.target.value });
  };

  const handleCardSubmit = () => {
    if (cardName.name == "") {
      
      toast.error("Fill The Feild")
    } else {
      let randomCardColor = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0");

      let randomColorComplete = "#" + randomCardColor;

      setCards((prev: any) => {
        return [
          ...prev,
          {
            name: cardName?.name,
            color: randomColorComplete,
          },
        ];
      });

      setCardName({ name: "" });
      setErr("");
      toast.success("Card Added Successfully")
    }
  };

  const handleTask2Change = (e: any) => {
    let { name, value } = e.target;

    setTask2((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleTask2Submit = () => {
    // setIsActiveId(id)
    // setIsCollapse(false)

    if (task2?.newTask != "") {
      setTodos((prev: any) => {
        return [
          ...prev,
          {
            task: task2?.newTask,
            period: task2.category,
            isDone: false,
            id: Date.now(),
          },
        ];
      });

      setTask2((prev: any) => {
        return {
          ...prev,
          newTask: "",
        };
      });
      toast.success("Task Added Successfully")

      // setIsActiveId(null)
    } else {
      setErr2("Enter Your Task");
    }
  };

  const handleEditTaskChange = (e: any) => {
    let { name, value } = e.target;

    setEditTask({
      ...editTask,
      [name]: value,
    });
  };

  const handleTaskEdit = (id: any) => {
    if (editTask?.task != "") {
      setTodos((prev) => {
        return prev.map((t, i) => {
          return t.id == id ? { ...t, task: editTask?.task ?? t.task } : t;
        });
      });

      toast.success("Task Edit Successfully")
      
    }
  };

  const deletetask = (delId: any) => {
    if (delId) {
      setTodos((prevTodo) => prevTodo.filter((item) => item.id != delId));
toast.success("Task Deleted Successfully")    }
  };

  return (
    <>
      {/* Todo Task Form Starts */}
      <div className="w-full bg-linear-to-r from-[#020344] to-[#28b8d5]
       ">
        <div className="grid grid-cols-12 ">
          <div className="col-span-12 my-2">
            <h5 className="text-center font-semibold text-2xl text-white">
         
              My Trello App
            </h5>
          </div>
          <div className="col-span-12 my-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTaskSubmit();
              }}
            >
              <div className="form-group grid grid-cols-12 gap-5 mx-50 ">
                <div className="col-span-5">
                  <input
                    type="text"
                    className="block w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-white/70 border border-white/20 rounded backdrop-blur-sm"
                    placeholder="Your Task Here"
                    value={task?.newTask}
                    name="newTask"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-5">
                  <select
                    name="category"
                    value={task?.category}
                    id=""
                    className="block w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-white/70 border border-white/20 rounded backdrop-blur-sm"
                    onChange={handleInputChange}
                  >
                    <option>Select One Category</option>
                    {cards.map((c, i) => {
                      return (
                        <>
                          <option value={c.name} style={{color:"black"}} >{c.name}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="block px-4 py-2 bg-white text-[#020344] border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 my-2">
          <div className="col-span-3"></div>
          <div className="col-span-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCardSubmit();
              }}
            >
              <div className="grid grid-cols-12">
                <div className="col-span-10">
                  <input
                    type="text"
                    className="block w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-white/70 border border-white/20 rounded backdrop-blur-sm"
                    placeholder="Your Task Here"
                    value={cardName?.name}
                    onChange={handleInputCardChange}
                  />
                </div>

                <div className="col-span-2 ml-1">
                  <button
                    type="submit"
                    className="block px-4 py-2 bg-white text-[#020344] border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    Add Card
                  </button>
                </div>
              </div>
            </form>
            <span>
              <p className="text-danger">{err}</p>
            </span>
          </div>
          <div className="col-span-3"></div>
        </div>
      </div>
      {/* Todo Task Form Ends */}

      {/* ==========================Starting Changes============ */}
      {/* Todo New Cards Starts */}
      <div className="container mx-auto my-3">
        {/* ======hjhkjhjhhj======= */}
        <div
          className="grid grid-flow-col auto-cols-[100px] overflow-x-auto  gap-1 rounded-lg  px-4 py-1  "
          style={{ overflowX: "auto" }}
        >
          {cards.map((c, i) => {
            return (
              <>
                <div key={i} className="col-span-4 my-2 bg-white border border-gray-100 shadow-lg shadow-black/50 overflow-hidden">
                  {/* ===this is card==== */}
                  <div
                    className="max-w-sm  rounded-lg shadow-md shadow-lg p-6 overflow-hidden"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <div style={{ height: "50vh", overflowY: "auto" }}>
                      <h4 className="font-bold text-2xl capitalize #F9FAFB border-b-2 border-blue-500 py-1">
                        {c.name}
                      </h4>
                      <ul className="list-none space-y-2 mt-6 mr-7">
                        {todos
                          .filter((todos) => todos.period == c.name)
                          .map((t, i) => {
                            return (
                              <>
                                <li
                                  key={t.id}
                                  className="grid grid-cols-12 gap-2  mx-1 rounded py-2 px-3 bg-white shadow-lg shadow-black/70"
                                  
                                >
                                  <div className="col-span-9 text-center capitalize"> {t.task}</div>
                                 
                                  <div className="col-span-3 flex flex-row">
                                   <span
                                   className="mx-1"
                                      onClick={() => {
                                        taskEditmodel.showModal();
                                        setEditTask({
                                          task: t.task,
                                          period: t.period,
                                          id: t.id,
                                        });
                                      }}
                                      data-bs-target="#editmodel"
                                      data-bs-toggle="modal"
                                    >
                                      <i
                                        className="fa-solid fa-pen-to-square " style={{color: "rgb(15, 125, 6)"}}
                                      ></i>
                                    </span>
                                    <span
                                      onClick={() => {
                                        deletetask(t.id);
                                      }}
                                    >
                                      <i
                                        className="fa-solid fa-delete-left"
                                        style={{ color: "rgb(255,0,0)" }}
                                      ></i>
                                    </span>
                                  </div>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                    <div className="card-footer  d-flex">
                      {/* <form onSubmit={(e)=>{
                  e.preventDefault()
   setIsActiveId(i.toString())
handleTask2Submit(c.name,i.toString())
                }}>
                  <div className="d-flex">
                <input placeholder={err2} name="newTask" value={task2?.newTask}  type="text" className="form-control  mx-1" id={i.toString()} onChange={handleTask2Change}   style={{ display: isActiveId === i.toString() ? "block" : "none" }}
 />
                <button type="submit" className="btn btn-light"  >Add Task</button>
                </div>
                </form> */}
                      <button
                        className="block px-4 py-2  w-full bg-linear-to-r from-[#020344] to-[#28b8d5] border border-gray-300 rounded-lg font-semibold text-white "
                        
                        data-bs-target="#taskmodel"
                        data-bs-toggle="modal"
                        onClick={() => {
                          setTask2((prev) => {
                            modal = document.getElementById(
                              "taskmodel",
                            ) as HTMLDialogElement;

                            modal.showModal();
                            return {
                              ...prev,
                              category: c.name,
                            };
                          });
                        }}
                        id="openModal"
                      >
                        Add New Task
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {/* Todo New Cards Ends */}
      {/* ==========================tailwind modal starts============== */}
      {/* NEW TASK STARTS */}

      <dialog
        id="taskmodel" className="m-auto rounded bg-white p-5 shadow-xl backdrop:bg-black/50 backdrop:blur-sm bg-linear-to-r from-[#020344] to-[#28b8d5]"
         >

      <div className="container mx-auto">
          <div className="grid grid-cols-12">
             <div className="col-span-12">
              
              <div className="grid grid-cols-12">
              <div className="col-span-10">
                <h3 className="font-bold text-2xl text-white">Enter A New Task</h3>
              </div>
              <div className="col-span-2">
                <button
                  className="block px-4 py-2 bg-white text-[#020344] border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  onClick={() => {
                    modal.close();
                  }}
                >
                  X
                </button>
              </div>
            </div>

            </div>
            <div className="col-span-4"></div>
            <div className="col-span-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  handleTask2Submit();

                  modal.close();
                }}
              >
                <div className="flex flex-col">
                  <input
                    placeholder="Enter a New Task"
                    name="newTask"
                    value={task2?.newTask}
                    type="text"
                    onChange={handleTask2Change}
                    className="block w-full px-4 py-2 text-sm placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />

                  <input
                    name="category"
                    value={task2.category}
                    type="hidden"
                    onChange={handleTask2Change}
                    className="block w-full px-4 py-2 text-sm placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="block px-4 py-2 my-3 bg-white text-[#020344] border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
            <div className="col-span-4"></div>
          </div>
        </div>



  

      </dialog>

      {/* NEW TASK ENDS */}

      {/* EDIT TASK STARTS */}

      <dialog
        id="taskEditmodel"
        className="m-auto rounded bg-white p-5 shadow-xl backdrop:bg-black/50 backdrop:blur-sm bg-linear-to-r from-[#020344] to-[#28b8d5]"
      >
        <div className="container mx-auto ">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              
              <div className="grid grid-cols-12">
              <div className="col-span-10">
                <h1 className="font-bold text-2xl text-white">Edit Your Task</h1>
              </div>
              <div className="col-span-2">
                <button
                  className="block px-4 py-2 bg-white text-[#020344] border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  onClick={() => {
                    taskEditmodel.close();
                  }}
                >
                  X
                </button>
              </div>
            </div>

            </div>
            
            <div className="col-span-4"></div>
            <div className="col-span-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTaskEdit(editTask?.id);
                  taskEditmodel.close();
                }}
              >
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="task"
                    value={editTask?.task}
                    onChange={handleEditTaskChange}
                    className="block w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-white/70 border border-white/20 rounded backdrop-blur-sm"
                  />
                  <input
                    type="hidden"
                    name="period"
                    value={editTask?.period}
                    onChange={handleEditTaskChange}
                    className="block w-full px-4 py-2 text-sm placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    type="hidden"
                    name="id"
                    value={editTask?.id}
                    onChange={handleEditTaskChange}
                    className="block w-full px-4 py-2 text-sm placeholder:text-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="block px-4 py-2 my-3 bg-white text-[#020344] border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
              </form>
              
            </div>
            <div className="col-span-4"></div>
          </div>
        </div>
      </dialog>

      {/* EDIT TASK ENDS */}

      {/* ==========================tailwind modal Ends============== */}

      {/*================= model box=============================== */}


    </>
  );
}
