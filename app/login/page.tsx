"use client"

import { supabase } from "@/utils/supabase/client"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


export default function login(){

let [loginUser,setLoginUser]=useState<{userEmail:string,userPassword:string}>({userEmail:"",userPassword:""})
let[err,setErr]=useState<string>("")

let router=useRouter();

const handleLogInChange=(e:any)=>{

let{name,value}=e.target

setLoginUser((prev)=>{
  return{
    ...prev,
    [name]:value
  }
})


}


const handleLoginSubmit=async()=>{
  if(loginUser.userEmail!="" && loginUser.userPassword!=""){
const { data, error } = await supabase
  .from('myUsers')
  .select().eq('userEmail',loginUser.userEmail.trim()).eq('userPassword',loginUser.userPassword.trim())

if(error){
  console.log(error.message)
  return
}

// console.log(data[0].id)
if(!data||data.length===0){
setErr("Invalid Email Or Password")
}else{
toast.success("Logged In Successfully")
console.log("This Is Login Id : "+data[0].id)
  localStorage.setItem('user',data[0].id);
router.push("/")
}



  }else{
    toast.error("Please Fill All the Fields")
  }
}


  return(
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     <div
        id="taskmodel" className="w-full max-w-100 h-fit max-h-[90vh] overflow-y-auto rounded-lg p-6 m-auto"
         >

      <div className="container mx-auto">
          <div className="grid grid-cols-12">
             <div className="col-span-12">
              
              <div className="grid grid-cols-12 ">
              <div className="col-span-12 ">
                <h3 className="font-bold text-2xl text-[#020344]">LogIn to Your Account</h3>
              </div>
            
            </div>

            </div>
            {/* <div className="col-span-4"></div> */}
            <div className="col-span-12">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
handleLoginSubmit()
                 
                }}
                >
                <div className="flex flex-col space-y-1 my-8">
                {/* =======================email=================== */}
                <label htmlFor="newTask" className="font-bold">Your Email</label>
                  <input
                    placeholder="Enter a Your Email"
                    name="userEmail"
                    value={loginUser.userEmail}
                    type="text"
                    onChange={handleLogInChange}
                    className="block w-full px-4 py-2 my-3 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
                  />
                    {/* =============================password================= */}
            <label htmlFor="password" className="font-bold">Your Email</label>        
<input
                    placeholder="Enter Your Password"
                    name="userPassword"
                    value={loginUser.userPassword}
                    type="text"
                    onChange={handleLogInChange}
                    className="block w-full px-4 py-2 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
                  />


 
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="block px-4 py-2 my-3 bg-linear-to-r from-[#020344] to-[#28b8d5] text-white border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    Log In
                  </button>

{
  err!=""?
<p className="text-red-700 text-center font-bold">{err}</p>:
<p></p>
}

                     <a href="/"
                className="font-bold px-4 py-2  text-center mx-1 bg-gray-200 text-black border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                  style={{cursor:"default"}}
                  // onClick={() => {
                    
                  // }}
                >
                  
                  Back to Home
                </a>

<p className="font-semibold text-center my-2">Dont Have an Account ? <a href="/signup" className="text-blue-900 underline">Sign Up</a></p>

                </div>
              </form>
            </div>
            {/* <div className="col-span-4"></div> */}
          </div>
        </div>



  

      </div> 

      </div>  
    </>
  )

}



