"use client";
import "dotenv"
import { MainButton } from "@/comp/buttons/mainbutton";
import { CheckFeature } from "@/comp/checkfeature";
import { Feature } from "@/comp/feature";
import { AuthInput } from "@/comp/input";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlowButton } from "@/comp/buttons/glowbutton";
import { error } from "console";
import useToastSetterRemover from "@/comp/toastfunction";
import Spin from "@/comp/buttons/spinningwheel";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type signupformtype = {
    email:string
    password:string
}

export default function() {
    const showToast = useToastSetterRemover()
    const router = useRouter();
    const [form, setfrom] = useState<signupformtype>({email:"",password:""});
    const [errors, seterrors] = useState<Record<string,string>>({});
    const [loading, setloading] = useState(false);
    const validateForm = () => {
    const newError:Record<string,string> = {};

    if (!form.email) {
        newError.email = "Email is required";
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newError.email = "Invalid email";
    }

    if (!form.password) {
        newError.password = "Password is required";
    }
    else if (form.password.length < 8) {
        newError.password = "Password must be 8 characters";
    }

    seterrors(newError)

    return Object.keys(newError).length === 0;
}
    return <div  className="h-screen w-screen bg-black text-white overflow-hidden flex justify-center items-center">
        <div className="z-50">
            </div> 
            <img src="/background-auth.webp" alt="background" className="absolute inset-0 h-full w-full select-none pointer-events-none z-0"></img>
            
            <div className="w-full max-w-lg px-4 text-sm z-10">
                
                <div className="font-semibold text-3xl text-center m-2 tracking-tight">Create a Flowgram account</div>

                <div className="flex justify-center gap-1">
                    <div className="text-[#9d9d9b]">Don't have an account?</div>
                    <div className="text-white font-medium hover:text-[#8d8d81] cursor-pointer" onClick={()=>{
                         router.push("/signup")
                    }}>Sign up.</div>
                </div>
                
                <div className="border-b border-white/15 w-full my-6"></div>
                
                <div className="space-y-1">
                    <AuthInput state={form.email} statesetter={(a:string)=>{setfrom((prev)=>({...prev,email:a})) }} label={"Email"} type="text" placeholder="adam123@gmail.com" />
                     {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}   
                    <AuthInput state={form.password} statesetter={(a:string)=>{setfrom((prev)=>({...prev,password:a})) }} label={"Password"} type="text" placeholder="••••••••••••" />
                     {errors.password && <div className="mt-1 text-xs text-red-500">{errors.password}</div>}   
                </div>

                <div className="mt-6">
                    <GlowButton onClick={async () => {
                              if(!validateForm()){
                                  return 
                              }
                              try {
                                  setloading(true)
                                  const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                                    email:  form.email,
                                    password : form.password,
                                  });
                                  localStorage.setItem("token", res.data.token);
                                  router.push("/workflows");
                                  setloading(false)

                              } catch (err:unknown) {
                                  const error = err as AxiosError<{message:string}>
                                  showToast({message : error.response?.data?.message ?? "Login failed",isError:true})
                                  setloading(false)
                              }
                        }}>
                          {loading ? 
                            <div className="h-5 w-5 rounded-full border-2 border-brand-border  border-t-brand-dark-bg dark:border-t-[#151619]  animate-spin" />
                            : "Sign in"}
                    </GlowButton>
                </div>

                <div className="text-[rgba(240,240,228,0.5)] text-xs mt-8 text-center">Ready to get started? Let's dive in and explore everything together!</div>
            </div>
    </div>
}


   