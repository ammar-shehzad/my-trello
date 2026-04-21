"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  let [task, setTask] = useState<{ newTask: any; category: any }>();
    let [task2, setTask2] = useState<{ newTask: any; category: any }>({newTask:"",category:""});

    let [todos,setTodos]=useState<{task:string,period:string,isDone:boolean,id:any}[]>([])
  let [todos1, setTodos1] = useState<
  {task: string; period: string; isDone: boolean}[]
  >([]);
  let [cardName,setCardName]=useState<{name:string}>({name:""})
  let [cards,setCards]=useState<{name:string,color:any}[]>([{name:"today",color:"#533F04"},{name:"this week",color:"#19573D"},{name:"later",color:"#101204"}])
let [err,setErr]=useState("")
let [err2,setErr2]=useState("")
let [isCollapse,setIsCollapse]=useState<boolean>(true)
let[isActiveId,setIsActiveId]=useState<string|null>(null)
let [editTask,setEditTask]=useState<{task:string,period:string,id:any}>({task:"",period:"",id:""})

  let TodayTask = todos.filter((todos) => todos.period == "today");
  let LaterTask = todos.filter((todos) => todos.period == "later");
  let thisweekTask = todos.filter((todos) => todos.period == "this week");

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

  const handleTaskSubmit = () => {
    setTodos((prev:any) => {
      return [
        ...prev,
        { id:Date.now(),task: task?.newTask, period: task?.category, isDone: false },
      ];
    });
  };


const handleInputCardChange=(e:any)=>{

setCardName(
  {name:e.target.value}
)

}


const handleCardSubmit=()=>{

if(cardName.name==""){
setErr("Fill The Feild")
}else{

  let randomCardColor=Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')

let randomColorComplete='#'+randomCardColor

setCards((prev:any)=>{

  return[
    ...prev,
    {
name:cardName?.name,
color:randomColorComplete

    }
  ]
})

setCardName({name:""})
setErr("")

}



}


const handleTask2Change=(e:any)=>{
let {name,value}=e.target

setTask2((prev:any)=>{
  return{
    ...prev,
    [name]:value
  }
})

}

const handleTask2Submit=()=>{

// setIsActiveId(id)
// setIsCollapse(false)

if(task2?.newTask!=""){
setTodos((prev:any)=>{
  return(
    
    
    [
    ...prev,
    {
task:task2?.newTask,
period:task2.category,
isDone:false,
id:Date.now()
    }
  ]


)
})

setTask2((prev:any)=>{
  return{
    ...prev,
    newTask:""
  }
})

// setIsActiveId(null)

}else{
  setErr2("Enter Your Task")

}



}



const handleEditTaskChange=(e:any)=>{
let {name,value}=e.target

setEditTask({
  ...editTask,
  [name]:value
})

}

const handleTaskEdit=(id:any)=>{

if(editTask?.task!=""){
setTodos((prev)=>{
return prev.map((t,i)=>{
   return t.id==id?
    {...t,task:editTask?.task??t.task}:
    t
  })


})

alert("Task Edited Successfully !")

}
}

const deletetask=(delId:any)=>{
if(delId){
  setTodos(prevTodo=>prevTodo.filter(item=>item.id!=delId))
  alert("Task Deleted Successfully")
}


}


  return (
    <>
      {/* Todo Task Form Starts */}
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-12 my-2">

            <h5 className="text-center">            <i className="fa-brands fa-trello fa-2xl" style={{color: "rgb(166, 17, 17)"}}></i> My Trello App</h5>
          </div>
          <div className="col-lg-12">
           <form onSubmit={(e)=>{
e.preventDefault()
handleTaskSubmit()            
           }}>
            <div className="form-group d-flex ">
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Your Task Here"
                value={task?.newTask}
                name="newTask"
                onChange={handleInputChange}
              />
              <select
                name="category"
                value={task?.category}
                id=""
                className="form-control mx-2"
                onChange={handleInputChange}
              >
                <option>Select One Category</option>
                {cards.map((c,i)=>{
            return(
             <>
             <option value={c.name}>{c.name}</option>
             </>
            )
          })}
              </select>
              <button type="submit" className="btn btn-dark mx-2">
                Save
              </button>
            </div>
</form>

          </div>
        </div>

<div className="row">
  <div className="col-lg-3"></div>
  <div className="col-lg-6 my-3">
              <form onSubmit={(e)=>{
e.preventDefault()
handleCardSubmit()
              }}>
      <div className="form-group d-flex ">

              
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Your Task Here"
                value={cardName?.name}
                
                onChange={handleInputCardChange}
              />
             
              <button type="submit" className="btn btn-dark mx-2" >
                Add Card
              </button>
            </div>
              </form>
                          <span><p className="text-danger">{err}</p></span>

  </div>
  <div className="col-lg-3"></div>

</div>

      </div>
      {/* Todo Task Form Ends */}

   



{/* ==========================Starting Changes============ */}
  {/* Todo New Cards Starts */}
      <div className="container ">
        <div className="row rounded  p-1 flex-row flex-nowrap " style={{overflowX:"scroll",backgroundColor:"#124170"}}>
          {cards.map((c,i)=>{
            return(
              <>
          <div key={i} className="col-lg-4 my-2 overflow-hidden">
            <div
              className="card rounded "
              style={{ backgroundColor: "#215B63" }}
            >
              <div className="card-body text-light" style={{height:"50vh",overflowY:"scroll"}}>
                <h4 className="card-title">{c.name}</h4>
                <ul className="list-group list-group-flush">
                  
                  {todos.filter(todos=>todos.period==c.name).map((t, i) => {
                    return (
                      <>
                        <li key={t.id} className="list-group-item rounded d-flex justify-content-between my-1">
                          {t.task}
                          
                          
                          <div className="form-check">
                              <span onClick={()=>{
                                setEditTask({task:t.task,period:t.period,id:t.id})
                              }} data-bs-target="#editmodel" data-bs-toggle="modal"><i className="fa-solid fa-pen mx-1" style={{color: "rgb(0,255,0)"}}></i></span>
                          <span onClick={()=>{deletetask(t.id)}}>
                            <i className="fa-solid fa-delete-left" style={{color: "rgb(255,0,0)"}}></i>
                          </span>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="checkDefault"
                            />
                          </div>
                        </li>
                      </>
                    );
                  })}



                </ul>


              </div>
              <div className="card-footer  d-flex">
                {/* <form onSubmit={(e)=>{
                  e.preventDefault()
   setIsActiveId(i.toString())
handleTask2Submit(c.name,i.toString())
                }}>
                  <div className="d-flex">
                <input placeholder={err2} name="newTask" value={task2?.newTask}  type="text" className="form-control  mx-1" id={i.toString()} onChange={handleTask2Change}   style={{ display: isActiveId === i.toString() ? "block" : "none" }}
 />
                <button type="submit" className="btn btn-light"  >Add Task</button>
                </div>
                </form> */}
                <button className="btn btn-dark" data-bs-target="#taskmodel" data-bs-toggle="modal" onClick={()=>{
                  setTask2((prev)=>{
                    return{
                      ...prev,
                      category:c.name
                    }
                  })
                }}>+</button>
              </div>

            </div>
          </div>              
              </>
            )
          })}

       
        </div>
      </div>

      {/* Todo New Cards Ends */}




{/*================= model box=============================== */}


<div className="modal"  role="dialog" id="editmodel" style={{marginTop:"150px"}}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Edit Task</h5>
        {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
      <div className="modal-body">

<form onSubmit={(e)=>{
  e.preventDefault()
  handleTaskEdit(editTask?.id)
}}>
  <input type="text" name="task" className="form-control my-2" value={editTask?.task} onChange={handleEditTaskChange}/>
  <input type="hidden" name="period" className="form-control my-2" value={editTask?.period} onChange={handleEditTaskChange} />
   <input type="hidden" name="id" className="form-control my-2" value={editTask?.id} onChange={handleEditTaskChange}/>

  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Save</button>
</form>
      </div>
      
    </div>
  </div>
</div>


{/* =============================Model Box For Task Submit======== */}

<div className="modal"  role="dialog" id="taskmodel" style={{marginTop:"150px"}}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Add New Task</h5>
        {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
      <div className="modal-body">

    <form onSubmit={(e)=>{
                  e.preventDefault()

handleTask2Submit()
                }}>
                  <div>
                <input placeholder="Enter a New Task" name="newTask" value={task2?.newTask}  type="text" className="form-control  mx-1"  onChange={handleTask2Change} />

<input  name="category" value={task2.category}  type="hidden" className="form-control  mx-1"  onChange={handleTask2Change} />

                <button type="submit" className="btn btn-dark my-3" data-bs-dismiss="modal"  >Add Task</button>
                </div>
                </form>
                
      </div>
      
    </div>
  </div>
</div>





    </>
  );
}


