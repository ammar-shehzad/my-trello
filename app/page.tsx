"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import MainHeader from "./components/Header";
import TodoCards from "./components/Cards";
import NewTodoTaskDialoge from "./components/AddNewTaskDialoge";
import EditTaskDialoge from "./components/EditTaskDialoge";
import DeleteConfirmationDialoge from "./components/DeleteConfirmationDialoge";
import AddNewTask1Dialoge from "./components/AddNewTask1Dialoge";
import AddNewCardsDialoge from "./components/AddNewCardsDialoge";
import { useRouter } from "next/navigation";
import React, { useRef } from 'react';
export default function Home() {
  let [task, setTask] = useState<{ newTask: any; category: any }>({
    newTask: "",
    category: "",
  });
  let [task2, setTask2] = useState<{ newTask: any; category: any }>({
    newTask: "",
    category: "",
  });

  let [todos, setTodos] = useState<
    { task: string; period: string; isDone: boolean; id: any;taskPosition:any }[]
  >([]);

  let [cardName, setCardName] = useState<{ name: string }>({ name: "" });
  let [cards, setCards] = useState<{ name: string; id: any }[]>([
    { name: "today", id: 0 },
    { name: "Last Week", id: 1 },
    { name: "Later", id: 2 },
  ]);
  let [err, setErr] = useState<any>("");

  let [err2, setErr2] = useState<any>("");

  let [editTask, setEditTask] = useState<{
    task: string;
    period: string;
    id: any;
  }>({ task: "", period: "", id: "" });

  let [deleteTask, setDeleteTask] = useState<{ task: string; taskId: any }>({
    task: "",
    taskId: "",
  });

let modal=document.getElementById("taskmodel") as HTMLDialogElement;
let taskEditmodel=document.getElementById(
    "taskEditmodel",
  ) as HTMLDialogElement;
 let deleteConfirmationModal=document.getElementById(
    "deleteConfirmationModal",
  ) as HTMLDialogElement;

//   if (typeof window !== 'undefined') {
//     modal= document.getElementById("taskmodel") as HTMLDialogElement;
  
// taskEditmodel=document.getElementById(
//     "taskEditmodel",
//   ) as HTMLDialogElement;


//  deleteConfirmationModal= document.getElementById(
//     "deleteConfirmationModal",
//   ) as HTMLDialogElement;


//   }


   

  modal?.addEventListener("click", (e) => {
    if (e.target == modal) modal.close();
  });

  taskEditmodel?.addEventListener("click", (e) => {
    if (e.target == taskEditmodel) taskEditmodel.close();
  });



  deleteConfirmationModal?.addEventListener("click", (e) => {
    if (e.target == deleteConfirmationModal) deleteConfirmationModal.close();
  });

  let Cardmodel = document.getElementById("Cardmodel") as HTMLDialogElement;

  Cardmodel?.addEventListener("click", (e) => {
    if (e.target == Cardmodel) Cardmodel.close();
  });

  let task1Model = document.getElementById("task1Model") as HTMLDialogElement;

  task1Model?.addEventListener("click", (e) => {
    if (e.target == task1Model) task1Model.close();
  });

  let [loading, setLoading] = useState<boolean>(true);

  let router = useRouter();

  // ===================for Fetching database===============

  const fetchdata = async () => {
    if (localStorage.getItem("user")) {

const { data:userData, error:userError } = await supabase.from('myUsers')
.select("*")
.eq("id", localStorage.getItem("user"));
if(userError){
  toast.error(userError.message)
}else{
if(userData?.length){
  
  console.log("This Is User : "+userData[0].userLoggedin)
if(userData[0].userLoggedin===true){

        const { data, error } = await supabase
        .from("myTask")
        .select("*")
        .eq("userId", localStorage.getItem("user"))
          .order('taskPosition', { ascending:true });;

      if (data?.length) {
        setTodos((prev: any) => {
          return [
            ...data.map((item) => ({
              id: item.id,
              task: item.task,
              period: item.period,
              isDone: item.isDone,
              taskPosition:item.taskPosition
            })),
          ];
        });
      }

      const { data: cardData, error: cardError } = await supabase
        .from("myCards")
        .select("*")
        .eq("userId", localStorage.getItem("user"));

      if (cardData?.length) {
        setCards((prev: any) => {
          return [
            { name: "today", id: 0 },
            { name: "Last Week", id: 1 },
            { name: "Later", id: 2 },
            ...cardData.map((i) => ({
              name: i.cardName,
              id: i.id,
            })),
          ];
        });
      }

      router.push("/");


} else{
  router.push("/login")
        setLoading(false);

} 
 
}
}

// ============================dskfksdjfjkdf=========================
      // console.log(await supabase
      //   .from('employee')
      //   .select('*'))
    } else {
      router.push("/login");
      setLoading(false);
      setTodos([]);
      setCards([{ name: "today", id: 0 }]);
    }
  };
  // to fetch realtime data from database
  useEffect(() => {
    fetchdata();

    const channel = supabase
      .channel("realtime myTask")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "myTask" },
        (payload) => {
          console.log("Change received!", payload);

          // 3. Update state based on payload type
          fetchdata(); // Simplest way: re-fetch data
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "myCards" },
        (payload) => {
          console.log("Change received for cards!", payload);

          fetchdata();
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "myUsers" },
        (payload) => {
          console.log("Change received for User LogOut!", payload);

          fetchdata();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <>
        {/* Todo Task Form Starts */}
        <MainHeader
          task={task}
          setTask={setTask}
          cards={cards}
          setCards={setCards}
          cardName={cardName}
          setCardName={setCardName}
          err={err}
          setErr={setErr}
          task1Model={task1Model}
          Cardmodel={Cardmodel}
          fetchdata={fetchdata}
        />

        {/* Todo Task Form Ends */}

        {/* Todo New Cards Starts */}

        <div className="container mx-auto my-3">
          <TodoCards
            cards={cards}
            setCards={setCards}
            todos={todos}
            setTodos={setTodos}
            editTask={editTask}
            setEditTask={setEditTask}
            deleteTask={deleteTask}
            setDeleteTask={setDeleteTask}
            task2={task2}
            setTask2={setTask2}
            taskEditmodel={taskEditmodel}
            deleteConfirmationModal={deleteConfirmationModal}
            modal={modal}
          />
        </div>

        {/* Todo New Cards Ends */}
        {/* ==========================tailwind modal starts============== */}
        {/* NEW TASK STARTS */}

        <NewTodoTaskDialoge
          modal={modal}
          err2={err2}
          setErr2={setErr2}
          task2={task2}
          setTask2={setTask2}
        />

        {/* NEW TASK ENDS */}

        {/* EDIT TASK STARTS */}

        <EditTaskDialoge
          taskEditmodel={taskEditmodel}
          editTask={editTask}
          setEditTask={setEditTask}
        />

        {/* EDIT TASK ENDS */}

        {/* ========================DELETE TASK CONFIRMATION MODAL STARTS=========  */}

        <DeleteConfirmationDialoge
          deleteConfirmationModal={deleteConfirmationModal}
          deleteTask={deleteTask}
          setDeleteTask={setDeleteTask}
        />

        {/* ========================DELETE TASK CONFIRMATION MODAL ENDS=========  */}

        {/* ============================Add Cards Model==================== */}
        <AddNewCardsDialoge
          cardName={cardName}
          setCardName={setCardName}
          Cardmodel={Cardmodel}
          err={err}
          setErr={setErr}
        />

        {/* =========================================Add New Task 1 Model ================= */}
        <AddNewTask1Dialoge
          task1Model={task1Model}
          task={task}
          setTask={setTask}
          cards={cards}
          setCards={setCards}
        />

        {/* ==========================tailwind modal Ends============== */}

        {/*================= model box=============================== */}
      </>
    );
  } else {
    return router.push("/login");
  }
}
