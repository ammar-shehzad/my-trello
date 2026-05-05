import { supabase } from "@/utils/supabase/client";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface ITask{
   newTask: any;
    category: any;
}


interface ICards{
    name: string;
    id: any;
}

interface AddNewTask1DialogeProps{
task1Model:HTMLDialogElement;
task:ITask;
setTask:Dispatch<SetStateAction<ITask>>;
cards:ICards[];
setCards:Dispatch<SetStateAction<ICards[]>>;


}


const AddNewTask1Dialoge:React.FC<AddNewTask1DialogeProps>=({task1Model,task,setTask,cards,setCards})=>{


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
    if (task.newTask != "" && task.category!="") {

const {count,error:countError}=await supabase.from("myTask").select("*",{count:'exact',head:true}).eq('period',task.category)


      const { error } = await supabase
        .from("myTask")
        .insert({
          task: task.newTask,
          period: task.category,
          isDone: false,
          userId: localStorage.getItem("user"),
          taskPosition:(count || 0)+1000
        });
      if (error) {
        // toast.error(error.message)
        console.log(error.message);
      } else {
        toast.success("Task Added Successfully");
        setTask({
          newTask:"",
          category:""
        })
        task1Model.close()
      }
    } else {
      toast.error("Fill All The Feild");
    }
  };



return(

<>

 <dialog
        id="task1Model"
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
                      task1Model.close();
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
                  handleTaskSubmit();
                }}
              >
               
                    <div className="flex flex-col space-y-6 my-8">

                  
                    <input
                      type="text"
                      className="block w-full px-4 py-2 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
                      placeholder="Your Task Here"
                      value={task?.newTask}
                      name="newTask"
                      onChange={handleInputChange}
                    />
                  
                  
                    <select
                      name="category"
                      value={task?.category}
                      id=""
                      className="block w-full px-4 py-2 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
                      onChange={handleInputChange}
                    >
                      <option style={{ color: "black" }}>
                        Select One Category
                      </option>
                      {cards.map((c, i) => {
                        return (
                        
                            <option key={c.id} value={c.id} style={{ color: "black" }}>
                              {c.name}
                            </option>
                        
                        );
                      })}
                    </select>
                  

                    <button
                      type="submit"
                      className="block px-4 py-2 my-3 bg-linear-to-r from-[#020344] to-[#28b8d5] text-white border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                    >
                      Save
                    </button>

      <button
                    type="button"
                    className=" px-4 py-2  mx-1 bg-gray-200 text-black border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                    style={{ cursor: "default" }}
                    onClick={() => {
                      task1Model.close();
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


)


}



export default AddNewTask1Dialoge