import { supabase } from "@/utils/supabase/client";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface ITask {
  newTask: any;
  category: any;
}

interface ICards {
  name: string;
  id: any;
}

interface ICardName {
  name: string;
}

interface MainHeaderProps {
  task: ITask;
  setTask: Dispatch<SetStateAction<ITask>>;
  cards: ICards[];
  setCards: Dispatch<SetStateAction<ICards[]>>;
  cardName: ICardName;
  setCardName: Dispatch<SetStateAction<ICardName>>;
  err: any;
  setErr: Dispatch<SetStateAction<any>>;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  task,
  setTask,
  cards,
  setCards,
  cardName,
  setCardName,
  err,
  setErr,
}) => {
  const handleUserLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      // fetchdata()
    }, 2000);
  };

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

  const handleTaskSubmit = async () => {
    if (task.newTask != "") {
      const { error } = await supabase
        .from("myTask")
        .insert({
          task: task.newTask,
          period: task.category,
          isDone: false,
          userId: localStorage.getItem("user"),
        });
      if (error) {
        // toast.error(error.message)
        console.log(error.message);
      } else {
        toast.success("Task Added Successfully");
      }
    } else {
      toast.error("Fill The Feild");
    }
  };

  const handleInputCardChange = (e: any) => {
    setCardName({ name: e.target.value });
  };

  const handleCardSubmit = async () => {
    if (cardName.name == "") {
      toast.error("Fill The Feild");
    } else {
      let randomCardColor = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0");

      let randomColorComplete = "#" + randomCardColor;

  

      const { error } = await supabase
        .from("myCards")
        .insert({
          cardName: cardName.name,
          userId: localStorage.getItem("user"),
        });

      if (error) {
        toast.error(error.message);
      } else {
        setCardName({ name: "" });
        setErr("");
        toast.success("Card Added Successfully");
      }
    }
  };

  return (
    <>
      <div
        className={`w-full ${!localStorage.getItem("user") && "h-[20vh]"}  bg-linear-to-r from-[#020344] to-[#28b8d5] overflow-hidden
       `}
      >
        <div className="grid grid-cols-12 ">
          <div className="col-span-10 my-2">
            <h5 className="text-center font-semibold text-2xl text-white">
              My Trello App
            </h5>
          </div>
          <div className="col-span-2 my-3">
            {!localStorage.getItem("user") ? (
              <a
                href="/login"
                                className="text-sm bg-white text-[#020344] p-0.5 border rounded-sm border-gray-300 hover:bg-opacity-90 lg:px-4 lg:py-2 lg:font-semibold md:px-4 md:py-2 md:font-semibold"
              >
                Log In
              </a>
            ) : (
              <a
                // className=" px-4 py-2 bg-white text-[#020344] border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                className="text-sm bg-white text-[#020344] p-0.5 border rounded-sm border-gray-300 hover:bg-opacity-90 lg:px-4 lg:py-2 lg:font-semibold md:px-4 md:py-2 md:font-semibold"
                style={{ cursor: "default" }}
                onClick={handleUserLogout}
              >
                Log Out
              </a>



            )}
          </div>

          {localStorage.getItem("user") && (
            <div className="col-span-12 my-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTaskSubmit();
                }}
              >
                <div className="form-group grid grid-cols-1 mx-3 lg:grid-cols-12 md:grid-cols-12 gap-5 lg:mx-50 md:mx-50">
                  <div className="col-span-1 md:hidden lg:hidden" >
<h3 className="text-center font-semibold text-xl text-white ml-20">Add New Task</h3>
</div>
                  <div className="col-span-5 lg:col-span-5 md:col-span-5">
                    <input
                      type="text"
                      className="block w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-white/70 border border-white/20 rounded backdrop-blur-sm"
                      placeholder="Your Task Here"
                      value={task?.newTask}
                      name="newTask"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-5 lg:col-span-5 md:col-span-5">
                    <select
                      name="category"
                      value={task?.category}
                      id=""
                      className="block w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-white/70 border border-white/20 rounded backdrop-blur-sm"
                      onChange={handleInputChange}
                    >
                      <option style={{ color: "black" }}>
                        Select One Category
                      </option>
                      {cards.map((c, i) => {
                        return (
                          <>
                            <option value={c.name} style={{ color: "black" }}>
                              {c.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-span-2 lg:col-span-1 md:col-span-1 flex justify-center md:block lg:block" >
                    <button
                      type="submit"
                      className="block px-4 py-2 bg-white text-[#020344] border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90 ml-20 lg:ml-0"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {localStorage.getItem("user") && (
          <div className="grid lg:grid-cols-12 md:grid-cols-12 gap-5 my-2">
            <div className="md:col-span-3 lg:col-span-3 col-span-1"></div>
            <div className="md:col-span-6 lg:col-span-6 col-span-1">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCardSubmit();
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-5 my-2">

<div className="col-span-1 md:hidden lg:hidden" >
<h3 className="text-center font-semibold text-xl text-white">Add New Card</h3>
</div>

                  <div className="col-span-1 md:col-span-10 lg:col-span-10">
                    <input
                      type="text"
                      className="block w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-white/70 border border-white/20 rounded backdrop-blur-sm"
                      placeholder="Your Task Here"
                      value={cardName?.name}
                      onChange={handleInputCardChange}
                    />
                  </div>

                  <div className="col-span-1 text-center md:col-span-2 lg:col-span-2 ">
                    <button
                      type="submit"
                className="block px-2 py-3 bg-white text-[#020344] border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90 ml-20 lg:ml-0"
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
        )}
      </div>
    </>
  );
};

export default MainHeader;
