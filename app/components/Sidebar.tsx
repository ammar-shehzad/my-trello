import { supabase } from "@/utils/supabase/client";
import Link from "next/link"

interface SidebarProps{
task1Model:HTMLDialogElement;
Cardmodel:HTMLDialogElement


}


const Sidebar:React.FC<SidebarProps>=({task1Model,Cardmodel})=>{

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


  const handleUserLogout =async() => {
    const { error } = await supabase
  .from('myUsers')
  .update({ userLoggedin:false})
  .eq('id',Number(localStorage.getItem("user") ))
    setTimeout(() => {
          localStorage.clear();

    }, 2000);
  };


return(

<div className="grid grid-cols-12">

<div className="col-span-12  my-3 lg:my-2 md:my-2 flex text-center mx-auto">
            <span>
              <i className="fa-brands fa-trello fa-xl" style={{color: "rgb(169, 171, 175)"}}></i>
            </span>
            <h5 className="text-start font-semibold text-xl 
              // text-[#A9ABAF]
              text-white
              ">
            Trello 
            </h5>
          </div>


<div className="col-span-12 mt-9 flex justify-center">

<div className="cursor-pointer" style={avatarStyle}>{initials}
  
</div>

</div>

<div className="col-span-12  flex justify-center">

<h3 className="font-bold text-white capitalize">Welcome {localStorage.getItem("userName")}</h3>


</div>


<div className="col-span-12 my-8">

 <nav className="flex-1 space-y-10">
        
          <a

        className="cursor-pointer flex justify-center gap-3 px-3 py-2 rounded-lg border-b-1 border-blue-700 transition-colors text-white hover:bg-gray-100 hover:text-black"
              onClick={() => {
                task1Model.showModal();
              }}
          >
            {/* <item.icon  /> */}
            <span className="font-medium ">Add Task</span>
          </a>
      

<a

            className="cursor-pointer flex justify-center gap-3 px-3 py-2 rounded-lg border-b-1 border-blue-700 transition-colors text-white hover:bg-gray-100 hover:text-black"
              onClick={() => {
                Cardmodel.showModal();
              }}

          >
            {/* <item.icon  /> */}
            <span className="font-medium ">Add Card</span>
          </a>

          <a

            className="cursor-pointer flex justify-center gap-3 px-3 py-2 rounded-lg border-b-1 border-blue-700 transition-colors text-white hover:bg-gray-100 hover:text-black"
            onClick={handleUserLogout}
            
          >
            {/* <item.icon  /> */}
            <span className="font-medium ">Log Out</span>
          </a>

      </nav>

</div>



</div>


)


}



export default Sidebar
