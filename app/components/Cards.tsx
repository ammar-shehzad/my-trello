import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { supabase } from "@/utils/supabase/client";
import toast from "react-hot-toast";

interface ICards {
  name: string;
  id: any;
  position:any
}

interface ITodos {
  task: string;
  period: string;
  isDone: boolean;
  id: any;
  taskPosition: any;
}

interface IEditTask {
  task: string;
  period: string;
  id: any;
}

interface IDeleteTask {
  task: string;
  taskId: any;
}

interface ITask2 {
  newTask: any;
  category: any;
}

// interface ITaskEditModelId {
//  taskEditmodel:HTMLDialogElement
// }

interface MainCardsProps {
  cards: ICards[];
  setCards: Dispatch<SetStateAction<ICards[]>>;
  todos: ITodos[];
  setTodos: Dispatch<SetStateAction<ITodos[]>>;
  editTask: IEditTask;
  setEditTask: Dispatch<SetStateAction<IEditTask>>;
  deleteTask: IDeleteTask;
  setDeleteTask: Dispatch<SetStateAction<IDeleteTask>>;
  task2: ITask2;
  setTask2: Dispatch<SetStateAction<ITask2>>;
  taskEditmodel: HTMLDialogElement;
  modal: HTMLDialogElement;
  deleteConfirmationModal: HTMLDialogElement;
}

const TodoCards: React.FC<MainCardsProps> = ({
  cards,
  setCards,
  todos,
  setTodos,
  editTask,
  setEditTask,
  deleteTask,
  setDeleteTask,
  task2,
  setTask2,
  taskEditmodel,
  modal,
  deleteConfirmationModal,
}) => {
  let router = useRouter();

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "CARD") {
      // let newCardsList = Array.from(cards);

    let sortedList = [...cards].sort((a, b) => a.position - b.position);

    const [draggedCard] = sortedList.splice(source.index, 1);



   const prevCard = sortedList[destination.index - 1];
  const nextCard = sortedList[destination.index];

let cardPos:number


if(!prevCard && !nextCard){
  cardPos=1000
}else if(!prevCard){
  cardPos=nextCard.position/2
}else if(!nextCard){
cardPos=prevCard.position+1024
}else{
  cardPos=(prevCard.position+nextCard.position)/2
}



      // let [dragCard] = newCardsList.splice(source.index, 1);
      const updatedCard={...draggedCard,position:cardPos}
      sortedList.splice(destination.index, 0, updatedCard);
      setCards(sortedList);

      console.log("This Is Draggable Id Of CARDS"+draggableId)

  const updateCardPosition = async () => {
    const { error } = await supabase
      .from('myCards')
      .update({ position: cardPos })
      .eq('id', Number(draggableId));
      if(error){
        toast.error(error.message)
      }
}
  updateCardPosition()
      // =========================database changes=======

      //  try {
      //       // Option A: Update only the moved card (requires re-indexing logic)
      //       // Option B: Update all cards based on new index (Easier, shown below)

      //       const updates = newCardsList.map((card, index) => ({
      //         id: card.id, // Assuming your card has a unique ID
      //         cardName: card.name,
      //         position: index, // Set new index
      //         userId:localStorage.getItem("user")
      //       }));

      //       const updateCardIndex=async()=>{
      //       const { error } = await supabase
      //         .from('cards') // Your table name
      //         .upsert(updates);

      //       if (error) throw error;

      //       console.log("Card order updated in Supabase");
      //       }

      //       updateCardIndex()
      //       // Assuming you have a Supabase client named 'supabase'

      //     } catch (error) {
      //       console.error("Error updating card order:", error);
      //       // Revert local state if database update fails
      //       // setCards(cards);
      //     }

      // =========================
    }

    let moveTask = todos.find((t) => t.id == draggableId);

    if (!moveTask) return;

    setTodos((prevtodos) => {
      let newTodos = Array.from(prevtodos);
      console.log(draggableId);

      const taskIndex = newTodos.findIndex((t) => t.id == draggableId);
      if (taskIndex === -1) return prevtodos;

      const destTasks = newTodos
        .filter((t) => String(t.period) === String(destination.droppableId))
        .sort((a, b) => a.taskPosition - b.taskPosition);

      let newPos: number;
      const prevTask = destTasks[destination.index - 1];
      const nextTask = destTasks[destination.index];

      if (!prevTask && !nextTask) {
        newPos = 1000;
      } else if (!prevTask) {
        newPos = nextTask.taskPosition / 2;
      } else if (!nextTask) {
        newPos = prevTask.taskPosition + 1;
      } else {
        newPos = (prevTask.taskPosition + nextTask.taskPosition) / 2;
      }

      // console.log(newTodos[taskIndex].taskPosition)
      const updateTask = {
        ...newTodos[taskIndex],
        period: destination.droppableId,
        taskPosition: newPos,
      };

      // ======for updating card name Starts===========

      const taskDroppableIndex = newTodos.findIndex(
        (t) => t.id == destination.droppableId,
      );

      const updateCardName = async (id: any, newName: any) => {
        const { error } = await supabase
          .from("myTask")
          .update({ period: newName, taskPosition: newPos })
          .eq("id", id);
      };

      updateCardName(Number(draggableId), destination.droppableId);

      // ======for updating card name Ends===========

      newTodos.splice(taskIndex, 1);
      const destcolumn = newTodos.filter(
        (t) => t.period == destination.droppableId,
      );

      const targetItem = destcolumn[destination.index];
      const insertedAt = targetItem
        ? newTodos.indexOf(targetItem)
        : newTodos.length;

      newTodos.splice(insertedAt, 0, updateTask);

      return newTodos;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* This Droppable is for  the cards start and inside it task droppable logic exist */}

      <Droppable droppableId="All-Columns" direction="horizontal" type="CARD">
        {(provided) => (
          <div
            className="grid grid-flow-col auto-cols-[70px] lg:auto-cols-[70px] md:auto-cols-[70px] overflow-x-auto  gap-1 lg:gap-5 md:gap-5 rounded-lg  px-4 py-1 
            // scrollbar stylling
             [&::-webkit-scrollbar]:h-2
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-track]:rounded-lg
    [&::-webkit-scrollbar-thumb]:bg-gray-400
    [&::-webkit-scrollbar-thumb]:rounded-lg
    [&::-webkit-scrollbar-thumb]:hover:bg-gray-500
            
            
            "
            style={{ overflowX: "auto" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map((c, i) => {
              return (
                <Draggable key={c.id} draggableId={String(c.id)} index={i}>
                  {(provided) => (
                    <div
                      className="col-span-4 my-2 bg-white border border-gray-100 shadow-lg shadow-black/50 overflow-hidden rounded-2xl"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      {/* ===this is card==== */}
                      <div
                        {...provided.dragHandleProps}
                        className="border-b-2 border-blue-500  px-1 py-1"
                      >
                        <h4 className="font-bold text-2xl mx-3 capitalize #F9FAFB  py-1">
                          {c.name} <br/>
                          
                        </h4>
                      </div>

                      {/* ===================This Dropable is for task starts================== */}

                      <Droppable
                        key={c.id}
                        droppableId={String(c.id)}
                        type="TASK"
                      >
                        {(provided, snapshot) => (
                          <div
                            className="rounded-lg shadow-md  bg-white  overflow-hidden"
                            // style={{ backgroundColor: "#FFFFFF" }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            <div
                            className=" /* 1. Set Width & Height */
    h-[50vh] overflow-y-auto 
    
    /* 2. Scrollbar Width (Thinner) */
    [&::-webkit-scrollbar]:w-1.5 
    
    /* 3. Track Styling */
    [&::-webkit-scrollbar-track]:bg-gray-100 
    [&::-webkit-scrollbar-track]:rounded-full
    
    /* 4. Thumb/Draggable Part Styling */
    [&::-webkit-scrollbar-thumb]:bg-blue-400 
    [&::-webkit-scrollbar-thumb]:rounded-full
    
    /* 5. Hover Effect */
    [&::-webkit-scrollbar-thumb:hover]:bg-blue-600
    
    rounded-lg px-4 py-1"
                            style={{ height: "50vh", overflowY: "auto" }}>
                              <ul className="list-none space-y-2 mt-6 mr-7">
                                {todos
                                  .filter((todos) => todos.period == c.id)
                                  .map((t, i) => {
                                    return (
                                      <Draggable
                                        key={t.id}
                                        draggableId={String(t.id)}
                                        index={i}
                                      >
                                        {(provided) => (
                                          <li
                                            key={t.id}
                                            className="grid grid-cols-12 gap-2  ml-5 rounded py-2 px-3 bg-white shadow-lg shadow-black/70"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <div className="col-span-9 truncate">
                                              {t.task}
                                              {/* {t.taskPosition} */}
                                            </div>

                                            <div className="col-span-3 flex flex-row">
                                              <span
                                                style={{
                                                  cursor: "default",
                                                }}
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
                                                  className="fa-solid fa-pen-to-square "
                                                  style={{
                                                    color: "rgb(15, 125, 6)",
                                                  }}
                                                ></i>
                                              </span>
                                              <span
                                                style={{
                                                  cursor: "default",
                                                }}
                                                onClick={() => {
                                                  setDeleteTask({
                                                    task: t.task,
                                                    taskId: t.id,
                                                  });
                                                  deleteConfirmationModal.showModal();
                                                  // deletetask(t.id);
                                                }}
                                              >
                                                <i
                                                  className="fa-solid fa-delete-left"
                                                  style={{
                                                    color: "rgb(255,0,0)",
                                                  }}
                                                ></i>
                                              </span>
                                            </div>
                                          </li>
                                        )}
                                      </Draggable>
                                    );
                                  })}
                              </ul>
                              {provided.placeholder}
                            </div>
                            <div className="card-footer  d-flex">
                              {localStorage.getItem("user") ? (
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
                                        category: c.id,
                                      };
                                    });
                                  }}
                                  id="openModal"
                                >
                                  Add New Task
                                </button>
                              ) : (
                                <button
                                  className="block px-4 py-2  w-full bg-linear-to-r from-[#020344] to-[#28b8d5] border border-gray-300 rounded-lg font-semibold text-white "
                                  onClick={() => router.push("/login")}
                                >
                                  Add New Task
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </Droppable>
                      {/* ===================This Dropable is for task Ends================== */}
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>

      {/* This Droppable is for  the cards Ends and inside it task droppable logic exist */}
    </DragDropContext>
  );
};


export default TodoCards;
