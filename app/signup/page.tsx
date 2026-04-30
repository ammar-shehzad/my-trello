"use client";

import { supabase } from "@/utils/supabase/client";

import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
  let [user, setUser] = useState<{
    userName: string;
    userEmail: string;
    userPassword: string;
  }>({ userName: "", userEmail: "", userPassword: "" });

  const handleUserChange = (e: any) => {
    let { name, value } = e.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addNewUser = async () => {
    if (
      user.userName != "" &&
      user.userEmail != "" &&
      user.userPassword != ""
    ) {
      const { data, error } = await supabase
        .from("myUsers")
        .select()
        .eq("userEmail", user.userEmail);

      if (error) {
        console.log(error.message);
        return;
      }

      if (data?.length > 0) {
        toast.error("User Already Exist");
        return;
      }

      const { error: insertError } = await supabase.from("myUsers").insert({
        userName: user.userName,
        userEmail: user.userEmail,
        userPassword: user.userPassword,
      });

      if (insertError) {
        console.log(insertError.message);
      } else {
        toast.success("Sign Up SuccessFully");
        setUser({
          userName: "",
          userEmail: "",
          userPassword: "",
        });
      }
    } else {
      toast.error("Please Fill All The Fields");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          id="taskmodel"
          className="w-full max-w-100 h-fit max-h-[90vh] overflow-y-auto rounded-lg p-6 m-auto"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <div className="grid grid-cols-12 ">
                  <div className="col-span-12 ">
                    <h3 className="font-bold text-2xl text-[#020344]">
                      Create Your Account
                    </h3>
                  </div>
                </div>
              </div>
              {/* <div className="col-span-4"></div> */}
              <div className="col-span-12">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addNewUser();
                  }}
                >
                  <div className="flex flex-col space-y-1 my-8">
                    {/* ===============================UserName============================ */}

                    <label htmlFor="newTask" className="font-bold">
                      Your Name
                    </label>
                    <input
                      placeholder="Enter a Your Name"
                      name="userName"
                      value={user.userName}
                      type="text"
                      onChange={handleUserChange}
                      className="block w-full px-4 py-2 my-3 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
                    />

                    {/* =======================email=================== */}
                    <label htmlFor="newTask" className="font-bold">
                      Your Email
                    </label>
                    <input
                      placeholder="Enter a Your Email"
                      name="userEmail"
                      value={user.userEmail}
                      type="text"
                      onChange={handleUserChange}
                      className="block w-full px-4 py-2 my-3 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
                    />
                    {/* =============================password================= */}
                    <label htmlFor="password" className="font-bold">
                      Your Password
                    </label>
                    <input
                      placeholder="Enter Your Password"
                      name="userPassword"
                      value={user.userPassword}
                      type="text"
                      onChange={handleUserChange}
                      className="block w-full px-4 py-2 text-sm 
                    text-black placeholder:text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020344]"
                    />

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="block px-4 py-2 my-3 bg-linear-to-r from-[#020344] to-[#28b8d5] text-white border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                    >
                      Sign Up
                    </button>

                    <a
                      href="/"
                      className="font-bold px-4 py-2  text-center mx-1 bg-gray-200 text-black border border-gray-300 rounded-lg font-semibold hover:bg-opacity-90"
                      style={{ cursor: "default" }}
                      // onClick={() => {

                      // }}
                    >
                      Back to Home
                    </a>

                    <p className="font-semibold text-center my-2">
                      Already Have an Account ?{" "}
                      <a href="/login" className="text-blue-900 underline">
                        Log In
                      </a>
                    </p>
                  </div>
                </form>
              </div>
              {/* <div className="col-span-4"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
