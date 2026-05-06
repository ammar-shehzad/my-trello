import { supabase } from "@/utils/supabase/client";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface IEditTask{
    task: string;
    period: string;
    id: any;
}



interface EditTaskDialogeProps{
taskEditmodel:HTMLDialogElement;
editTask:IEditTask;
setEditTask:Dispatch<SetStateAction<IEditTask>>;


}



const EditTaskDialoge:React.FC<EditTaskDialogeProps>=({taskEditmodel,editTask,setEditTask})=>{


 const handleEditTaskChange = (e: any) => {
    let { name, value } = e.target;

    setEditTask({
      ...editTask,
      [name]: value,
    });
  };

  const handleTaskEdit = async (id: any) => {
    if (editTask?.task != "") {
      // setTodos((prev) => {
      //   return prev.map((t, i) => {
      //     return t.id == id ? { ...t, task: editTask?.task ?? t.task } : t;
      //   });
      // });

      const { error } = await supabase
        .from("myTask")
        .update({ task: editTask.task })
        .eq("id", id);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Task Edit Successfully");
      }

      // fetchdata();
    }
  };



return(
<>
  <dialog
        id="taskEditmodel"
        className="w-full max-w-100 h-fit max-h-[90vh] overflow-y-auto rounded-lg p-6 m-auto"
      >
        <div className="container mx-auto ">
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
                      taskEditmodel.close();
                    }}
                  >
                    X
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-12">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTaskEdit(editTask?.id);
                  taskEditmodel.close();
                }}
              >
                <div className="flex flex-col space-y-3 my-5">
                  <input
                    type="text"
                    name="task"
                    value={editTask?.task}
                    onChange={handleEditTaskChange}
                    className="block w-full px-4 py-2 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
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
                    className="block px-4 py-2 my-3 bg-linear-to-r from-[#020344] to-[#28b8d5] text-white border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    Save
                  </button>
                  <button
                    className="font-bold px-4 py-2  mx-1 bg-gray-200 text-black border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                    style={{ cursor: "default" }}
                    onClick={() => {
                      taskEditmodel.close();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>


</>
);


}



export default EditTaskDialoge