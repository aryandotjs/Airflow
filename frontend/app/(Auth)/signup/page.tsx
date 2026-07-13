"use client";
import "dotenv"
import { Appbar } from "@/comp/Appbar";
import { MainButton } from "@/comp/buttons/mainbutton";
import { CheckFeature } from "@/comp/checkfeature";
import { Feature } from "@/comp/feature";
import { Input } from "@/comp/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlowButton } from "@/comp/buttons/glowbutton";

export default function() {
    const url = "http://localhost:3001"
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled , setdesabled] = useState(true)
    const disablechecker =()=> {
         if (email.includes("mail.co") && password.length > 7 ) {
            setdesabled(false)
         }else{
            setdesabled(true)
         }
    }
    return <div  className="h-screen w-screen bg-black text-white overflow-hidden flex justify-center items-center"> 
            <img src="/background-auth.webp" alt="background" className="absolute inset-0 h-full w-full select-none pointer-events-none z-0"></img>
            
            <div className="w-full max-w-lg px-4 text-sm z-10">
                <div className="justify-center flex items-center">
                    <img src="/mainlogo.png" alt="background" className=" h-15 "></img>
                </div>
                <div className="font-semibold text-3xl text-center m-2 tracking-tight">Create a Flowgram account</div>

                <div className="flex justify-center gap-1">
                    <div className="text-[#9d9d9b]">Already have an account?</div>
                    <div className="text-white font-medium hover:text-[#8d8d81] cursor-pointer"onClick={()=>{
                         router.push("/login")
                    }}>Log in.</div>
                </div>
                
                <div className="border-b border-white/15 w-full my-6"></div>
                
                <div className="space-y-1">
                    <Input label={"Name"} onChange={e => setName(e.target.value)} type="text" placeholder="adam" />
                    <Input onChange={e => {
                         disablechecker()
                         setEmail(e.target.value)
                         }} label={"Email"} type="text" placeholder="adam123@gmail.com" />
                    <Input onChange={e => { 
                         disablechecker()
                         setPassword(e.target.value)
                        }} label={"Password"} type="password" placeholder="••••••••••••" />
                </div>

                <div className="mt-6">
                    <GlowButton onClick={async () => {
                        const res = await axios.post(`${url}/api/v1/user/signup`, { email, password, name });
                        if (res) {
                            localStorage.setItem("token", res.data.token)
                            router.push("/dashboard");
                        }
                    }} disabled={disabled}>create account</GlowButton>
                </div>

                <div className="text-[rgba(240,240,228,0.5)] text-xs mt-8 text-center">Ready to get started? Let's dive in and explore everything together!</div>
            </div>
    </div>
}