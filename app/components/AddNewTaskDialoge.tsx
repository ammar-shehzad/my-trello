import { supabase } from "@/utils/supabase/client";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface ITask2 {
  newTask: any;
  category: any;
}

interface NewTaskDialogeProps {
  modal: HTMLDialogElement;
  task2: ITask2;
  setTask2: Dispatch<SetStateAction<ITask2>>;
  err2: any;
  setErr2: Dispatch<SetStateAction<any>>;
}

const NewTodoTaskDialoge: React.FC<NewTaskDialogeProps> = ({
  modal,
  task2,
  setTask2,
  err2,
  setErr2,
}) => {
  const handleTask2Change = (e: any) => {
    let { name, value } = e.target;

    setTask2((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleTask2Submit = async () => {
    if (task2?.newTask != "") {
      const { count, error: countError } = await supabase
        .from("myTask")
        .select("*", { count: "exact", head: true })
        .eq("period", task2.category);


      const { error } = await supabase.from("myTask").insert({
        task: task2.newTask,
        period: task2.category,
        isDone: false,
        userId: localStorage.getItem("user"),
        taskPosition:(count ||0)+1000
      });
      if (error) {
        // toast.error(error.message)
        console.log(error.message);
      } else {
        toast.success("Task Added Successfully");
        modal.close();
        // fetchdata();
      }

      setTask2((prev: any) => {
        return {
          ...prev,
          newTask: "",
        };
      });

      // setIsActiveId(null)
    } else {
      setErr2("Enter Your Task");
      toast.error("Fill The Field");
    }
  };

  return (
    <>
      <dialog
        id="taskmodel"
        className="w-full max-w-100 h-fit max-h-[90vh] overflow-y-auto rounded-lg p-6 m-auto"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="grid grid-cols-12 ">
                <div className="col-span-10 ">
                  <h3 className="font-bold text-2xl text-[#020344]">
                    Enter A New Task
                  </h3>
                </div>
                <div className="col-span-2 flex justify-end">
                  <span
                    className="font-bold"
                    style={{ cursor: "default" }}
                    onClick={() => {
                      modal.close();
                    }}
                  >
                    X
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="col-span-4"></div> */}
            <div className="col-span-12">
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  handleTask2Submit();

                  // modal.close();
                }}
              >
                <div className="flex flex-col space-y-1 my-8">
                  <input
                    placeholder="Enter a New Task"
                    name="newTask"
                    value={task2?.newTask}
                    type="text"
                    onChange={handleTask2Change}
                    className="block w-full px-4 py-2 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
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
                    className="block px-4 py-2 my-3 bg-linear-to-r from-[#020344] to-[#28b8d5] text-white border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    Add Task
                  </button>

                  <button
                    className="font-bold px-4 py-2  mx-1 bg-gray-200 text-black border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                    style={{ cursor: "default" }}
                    onClick={() => {
                      modal.close();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            {/* <div className="col-span-4"></div> */}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NewTodoTaskDialoge;
