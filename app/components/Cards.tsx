import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

interface ICards {
  name: string;
  id: any;
}

interface ITodos {
  task: string;
  period: string;
  isDone: boolean;
  id: any;
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
  editTask:IEditTask;
  setEditTask:Dispatch<SetStateAction<IEditTask>>;
  deleteTask:IDeleteTask;
  setDeleteTask:Dispatch<SetStateAction<IDeleteTask>>;
  task2:ITask2;
  setTask2:Dispatch<SetStateAction<ITask2>>;
  taskEditmodel:HTMLDialogElement;
  modal:HTMLDialogElement;
  deleteConfirmationModal:HTMLDialogElement;
  
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
  deleteConfirmationModal
  
  

}) => {
 
 
let router=useRouter()

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "CARD") {
      let newCardsList = Array.from(cards);
      let [dragCard] = newCardsList.splice(source.index, 1);
      newCardsList.splice(destination.index, 0, dragCard);
      setCards(newCardsList);
    }

    let moveTask = todos.find((t) => t.id == draggableId);

    if (!moveTask) return;

    setTodos((prevtodos) => {
      let newTodos = Array.from(prevtodos);
      console.log(draggableId);

      const taskIndex = newTodos.findIndex((t) => t.id == draggableId);
      if (taskIndex === -1) return prevtodos;

      const updateTask = {
        ...newTodos[taskIndex],
        period: destination.droppableId,
      };

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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* This Droppable is for  the cards start and inside it task droppable logic exist */}

        <Droppable droppableId="All-Columns" direction="horizontal" type="CARD">
          {(provided) => (
            <div
              className="grid grid-flow-col auto-cols-[100px] overflow-x-auto  gap-1 rounded-lg  px-4 py-1  "
              style={{ overflowX: "auto" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map((c, i) => {
                return (
                  <Draggable key={c.name} draggableId={c.name} index={i}>
                    {(provided) => (
                      <div
                        key={i}
                        className="col-span-4 my-2 bg-white border border-gray-100 shadow-lg shadow-black/50 overflow-hidden"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        {/* ===this is card==== */}
                        <div {...provided.dragHandleProps}>
                          <h4 className="font-bold text-2xl mx-3 capitalize #F9FAFB border-b-2 border-blue-500 py-1">
                            {c.name}
                          </h4>
                        </div>

                        {/* ===================This Dropable is for task starts================== */}

                        <Droppable droppableId={c.name} type="TASK">
                          {(provided, snapshot) => (
                            <div
                              className="rounded-lg shadow-md shadow-lg  overflow-hidden"
                              style={{ backgroundColor: "#FFFFFF" }}
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              <div
                                style={{ height: "50vh", overflowY: "auto" }}
                              >
                                <ul className="list-none space-y-2 mt-6 mr-7">
                                  {todos
                                    .filter((todos) => todos.period == c.name)
                                    .map((t, i) => {
                                      return (
                                        <>
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
                                                <div className="col-span-9">
                                                  {" "}
                                                  {t.task}
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
                                                        color:
                                                          "rgb(15, 125, 6)",
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
                                        </>
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
                                          category: c.name,
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
    </>
  );
};

export default TodoCards;
