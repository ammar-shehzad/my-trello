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


let[isOpen,setIsOpen]=useState<boolean>(false)


  const handleUserLogout =async() => {
    const { error } = await supabase
  .from('myUsers')
  .update({ userLoggedin:false})
  .eq('id',Number(localStorage.getItem("user") ))
    setTimeout(() => {
          localStorage.clear();

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

  if(!localStorage.getItem("userName")) return null

const nameParts=localStorage.getItem("userName")?.split(' ')
const initials=nameParts?.map(part=>part[0]).join('').toUpperCase()
console.log(nameParts +" " + initials)


const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#FF991F',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'semibold',
    fontSize: '16px',
  };


  return (
    <>
      <div
        className={`w-full h-[20vh]
       `}
      >


{/* =========================this is the top Most Header================= */}
        <div className="grid grid-cols-12  py-2 bg-[#1F1F21]">
          <div className="col-span-2  my-2 flex">
            <span>
              <i className="fa-brands fa-trello" style={{color: "rgb(169, 171, 175)"}}></i>
            </span>
            <h5 className="text-start font-semibold   text-[#A9ABAF]">
            Trello 
            </h5>
          </div>
          <div className="col-span-7">
<div className="flex justify-center gap-2 ">

<form className="max-w-md w-full ">   
    <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-[#A9ABAF]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
        </div>
        <input type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-[#A9ABAF] text-sm rounded-sm focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
        <button type="button" className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
    </div>
</form>
   <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-7 py-2 text-center leading-5 rounded-lg">Create</button>


</div>

          </div>
          <div className="col-span-3 my-3 flex justify-end">

<div className="relative inline-block text-left">

<button onClick={()=>setIsOpen(!isOpen)}>
<div className="cursor-pointer" style={avatarStyle}>{initials}
  
</div>
</button>



  {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10  overflow-y-auto">
          <div className="py-1">
            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleUserLogout}>Log out</button>
          </div>
        </div>
      )}

</div>



            {/* {!localStorage.getItem("user") ? (
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



            )} */}
          </div>

        </div>


{/* =========================this is the Second Most Header================= */}


<div className="grid grid-cols-12  bg-[#1F1F21]/70">
          <div className="col-span-2  my-2 flex">
                <button
               className="button text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-7 py-2 text-center leading-5 rounded-lg"
              onClick={() => {
                task1Model.showModal();
              }}
            >
              Add New Task
            </button>
          </div>
          <div className="col-span-7">


          </div>
          <div className="col-span-3 my-3 flex justify-end">
<ul className="flex space-x-6">
  <li><span><i className="fa-solid fa-plug" style={{color: "white"}}></i></span></li>
  <li><i className="fa-solid fa-bolt" style={{color: "white"}}></i></li>
  <li><span><i className="fa-solid fa-star" style={{color: "white"}}></i></span></li>
  <li></li>
</ul>
     <button
               className="button text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-7 py-2 text-center leading-5 rounded-lg"
              onClick={() => {
                Cardmodel.showModal();
              }}
            >
              Add New Card
            </button>

          </div>

        </div>


{/* ================================================================ */}
          {/* {localStorage.getItem("user") && (


<div className="container lg:mx-auto md:mx-auto my-1 ">
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
 )} */}



       
      </div>
    </>
  );
};

export default MainHeader;
