import { supabase } from "@/utils/supabase/client";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface IDeleteTask{

task:string,
taskId:any,
  
}


interface DeleteConfirmationDialogeProps{
deleteConfirmationModal:HTMLDialogElement;
deleteTask:IDeleteTask;
setDeleteTask:Dispatch<SetStateAction<IDeleteTask>>;

}


const DeleteConfirmationDialoge:React.FC<DeleteConfirmationDialogeProps>=({deleteConfirmationModal,deleteTask,setDeleteTask})=>{

  const deletetask = async (delId: any) => {
    if (delId) {
      // setTodos((prevTodo) => prevTodo.filter((item) => item.id != delId));

      const { error } = await supabase.from("myTask").delete().eq("id", delId);
      console.log(delId);

      if (error) {
        console.log(error.message);
      }
      // fetchdata();
      deleteConfirmationModal.close();
      toast.success("Task Deleted Successfully");
    }
  };



return(
 <>
 
  <dialog
        id="deleteConfirmationModal"
        className="w-full max-w-lg h-fit max-h-[90vh] overflow-y-auto rounded-lg p-6 m-auto"
      >
        <div className="container  ">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="grid grid-cols-12 m-0 py-3">
                <div className="col-span-10">
                  <h6 className="font-bold text-2xl mx-2 text-[#020344]">
                    Confirmation
                  </h6>
                </div>
                <div className="col-span-2 flex justify-end">
                  <span
                    className=" font-semibold"
                    onClick={() => {
                      deleteConfirmationModal.close();
                    }}
                    style={{ cursor: "default" }}
                  >
                    X
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-12  space-y-3 my-4">
              <p className="font-bold  text-gray-500">
                Are You Sure Delete Task : {deleteTask?.task} ?
              </p>
            </div>
            <div className="col-span-12 flex justify-end">
              <button
                className="px-4 py-2 my-3 mx-1 bg-gray-200 text-black border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                onClick={() => {
                  deleteConfirmationModal.close();
                }}
                style={{ cursor: "default" }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 my-3 bg-red-500 text-white border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                onClick={() => {
                  deletetask(deleteTask?.taskId);
                }}
              >
                Confirm Delete
                <i
                  className="fa-solid fa-trash fa-beat mx-1"
                  style={{ color: "rgb(255, 255, 255);" }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </dialog>
 
 </> 
)


}


export default DeleteConfirmationDialoge