import { supabase } from "@/utils/supabase/client"

interface SidebarMobileDialogeProps{
task1Model:HTMLDialogElement;
Cardmodel:HTMLDialogElement;


}



const SidebarMobileDialoge:React.FC<SidebarMobileDialogeProps>=({task1Model,Cardmodel})=>{


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

 let sidebar = document.getElementById("sidebar") as HTMLDialogElement;


 sidebar?.addEventListener("click", (e) => {
    if (e.target == sidebar) sidebar.close();
  });


  return(

  <dialog
        id="sidebar"
        className="w-full  max-w-70   overflow-y-auto rounded-lg p-4 top-0 left-0 h-screen bg-[#1F1F21]/90 block lg:hidden md:hidden"
      >

<div className="grid grid-cols-12 ">

<div className="col-span-12  my-3 lg:my-2 md:my-2 flex justify-end ">

<span className="text-white font-bold cursor-pointer " onClick={()=>{sidebar.close()
}}>X</span>

</div>

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
                sidebar.close()
              }}
          >
            {/* <item.icon  /> */}
            <span className="font-medium ">Add Task</span>
          </a>
      

<a

            className="cursor-pointer flex justify-center gap-3 px-3 py-2 rounded-lg border-b-1 border-blue-700 transition-colors text-white hover:bg-gray-100 hover:text-black"
              onClick={() => {
                Cardmodel.showModal();
                                sidebar.close()

              }}

          >
            {/* <item.icon  /> */}
            <span className="font-medium ">Add Card</span>
          </a>

          <a

            className="cursor-pointer flex justify-center gap-3 px-3 py-2 rounded-lg border-b-1 border-blue-700 transition-colors text-white hover:bg-gray-100 hover:text-black"
            onClick={()=>{
              handleUserLogout()
sidebar.close()

            }}
            
          >
            {/* <item.icon  /> */}
            <span className="font-medium ">Log Out</span>
          </a>

      </nav>

</div>



</div>

   </dialog>


  )



}

export default SidebarMobileDialoge