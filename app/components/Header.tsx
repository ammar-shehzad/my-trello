import { supabase } from "@/utils/supabase/client";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  Cardmodel:HTMLDialogElement;
  task1Model:HTMLDialogElement;
  fetchdata:() => void;
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
  Cardmodel,
  task1Model,
  fetchdata
}) => {





  const handleUserLogout = () => {
    localStorage.clear();
    setTimeout(() => {
fetchdata()
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
          <div className="col-span-10  my-2">
            <h5 className="text-center font-semibold   text-2xl  text-white">
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

        </div>


          {localStorage.getItem("user") && (


<div className="container lg:mx-auto md:mx-auto my-5 ">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 space-y-4">
          <div className="col-span-1 lg:col-span-12 md:col-span-12 text-center space-y-3">
  <h5 className="text-center font-semibold text-2xl text-white my-2">
              My Trello App
            </h5>          

         
          </div>

<div className="col-span-1 lg:col-span-3 md:col-span-3"></div>
<div className="col-span-1 px-1  lg:col-span-3 md:col-span-3">
    <button
              className=" w-full px-4 py-2  bg-linear-to-r from-cyan-400 to-blue-500 border border-gray-300 -lg font-semibold text-white rounded-lg  hover:bg-opacity-90  lg:ml-0"
              onClick={() => {
                Cardmodel.showModal();
              }}
            >
              Add New Card
            </button>
</div>
<div className="col-span-1 px-1 lg:col-span-3 md:col-span-3">
     <button
              className="w-full px-4 py-2  bg-linear-to-r from-cyan-400 to-blue-500 border border-gray-300 -lg font-semibold text-white rounded-lg  hover:bg-opacity-90 lg:ml-0"
              onClick={() => {
                task1Model.showModal();
              }}
            >
              Add New Task
            </button>
</div>
<div className="col-span-1 lg:col-span-3 md:col-span-3"></div>




        </div>
      </div>
 )}


{/* <div className="grid grid-cols-12">

<div className="container lg:mx-auto md:mx-auto my-3 ">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-12 md:col-span-12 text-center space-y-3">
            <h3 className="font-mono font-bold text-3xl">Your Tasks</h3>
          

         
          </div>

<div className="col-span-1 lg:col-span-3 md:col-span-3"></div>
<div className="col-span-1 px-1  lg:col-span-3 md:col-span-3">
    <button
              className=" w-full px-4 py-2  bg-linear-to-r from-[#020344] to-[#28b8d5] border border-gray-300 -lg font-semibold text-white rounded-lg  hover:bg-opacity-90  lg:ml-0"
              onClick={() => {
                Cardmodel.showModal();
              }}
            >
              Add New Card
            </button>
</div>
<div className="col-span-1 px-1 lg:col-span-3 md:col-span-3">
     <button
              className="w-full px-4 py-2  bg-linear-to-r from-[#020344] to-[#28b8d5] border border-gray-300 -lg font-semibold text-white rounded-lg  hover:bg-opacity-90 lg:ml-0"
              onClick={() => {
                task1Model.showModal();
              }}
            >
              Add New Task
            </button>
</div>
<div className="col-span-1 lg:col-span-3 md:col-span-3"></div>




        </div>
      </div>

</div> */}

       
      </div>
    </>
  );
};

export default MainHeader;
