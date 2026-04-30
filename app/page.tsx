"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { todo } from "node:test";
import { supabase } from "@/utils/supabase/client";
import { error } from "console";
import { useRouter } from "next/navigation";
import MainHeader from "./components/Header";
import TodoCards from "./components/Cards";
import NewTodoTaskDialoge from "./components/AddNewTaskDialoge";
import EditTaskDialoge from "./components/EditTaskDialoge";
import DeleteConfirmationDialoge from "./components/DeleteConfirmationDialoge";
// import MainHeader from "./components/Header";

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
    { task: string; period: string; isDone: boolean; id: any }[]
  >([]);

  let [cardName, setCardName] = useState<{ name: string }>({ name: "" });
  let [cards, setCards] = useState<{ name: string; id: any }[]>([
    { name: "today", id: 0 },
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

  let router = useRouter();
  let modal = document.getElementById("taskmodel") as HTMLDialogElement;

  let taskEditmodel = document.getElementById(
    "taskEditmodel",
  ) as HTMLDialogElement;

  modal?.addEventListener("click", (e) => {
    if (e.target == modal) modal.close();
  });

  taskEditmodel?.addEventListener("click", (e) => {
    if (e.target == taskEditmodel) taskEditmodel.close();
  });

  let deleteConfirmationModal = document.getElementById(
    "deleteConfirmationModal",
  ) as HTMLDialogElement;

  deleteConfirmationModal?.addEventListener("click", (e) => {
    if (e.target == deleteConfirmationModal) deleteConfirmationModal.close();
  });

  // ===================for Fetching database===============

  const fetchdata = async () => {
    if (localStorage.getItem("user")) {
      const { data, error } = await supabase
        .from("myTask")
        .select("*")
        .eq("userId", localStorage.getItem("user"));

      if (data?.length) {
        setTodos((prev: any) => {
          return [
            ...data.map((item) => ({
              id: item.id,
              task: item.task,
              period: item.period,
              isDone: item.isDone,
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
            ...cardData.map((i) => ({
              name: i.cardName,
              id: i.id,
            })),
          ];
        });
      }

      // console.log(await supabase
      //   .from('employee')
      //   .select('*'))
    } else {
      setTodos([]);
      setCards([{ name: "today", id: 0 }]);
    }
  };

 

  

 



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
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ==============================

  // useEffect(()=>{
  //   fetchdata()
  // },[])

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
      />

      {/* Todo Task Form Ends */}

      {/* Todo New Cards Starts */}
      <div className="container mx-auto my-3">
        {/* =======================I am Starting Changes For Card Drag================== */}
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

   <NewTodoTaskDialoge modal={modal} err2={err2} setErr2={setErr2} task2={task2} setTask2={setTask2}/>

      {/* NEW TASK ENDS */}

      {/* EDIT TASK STARTS */}

    <EditTaskDialoge taskEditmodel={taskEditmodel} editTask={editTask} setEditTask={setEditTask}/>

      {/* EDIT TASK ENDS */}

      {/* ========================DELETE TASK CONFIRMATION MODAL STARTS=========  */}

     <DeleteConfirmationDialoge deleteConfirmationModal={deleteConfirmationModal} deleteTask={deleteTask} setDeleteTask={setDeleteTask}/>

      {/* ========================DELETE TASK CONFIRMATION MODAL ENDS=========  */}

      {/* ==========================tailwind modal Ends============== */}

      {/*================= model box=============================== */}
    </>
  );
}
