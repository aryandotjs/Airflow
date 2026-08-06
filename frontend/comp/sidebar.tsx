"use client"
import {  MainButtonforsidebar } from "./buttons/mainbutton";
import {  Add, AddwithBorder, Execution, Locksvg, WorkflowIcon } from "./svg/allsvg";
import { Me, Me2 } from "./me";
import { CreateButton } from "./buttons/createbutton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";


export function Sidebar(){
     const [me,setme] = useState(null)
     const Router = useRouter()
     useEffect(()=>{
         api.get("/api/v1/user/me").then((a)=>{
             setme(a.data.user)
         });
     },[])
     
     return <div className="transition-w ease-in-out duration-100  border-r w-15 p-1 lg:w-60 h-full border-r-brand-border dark:border-r-dark-border  max-w-62   lg:px-4  normal font-semibold flex flex-col justify-between  gap-5 pb-32">
        <div className="w-full ">
            <Me me={me ?? {}}></Me>
        </div>
        <div className="flex flex-col gap-2 flex-2">
           <MainButtonforsidebar onclick={()=> Router.push("/workflows")} size="small"  name={"Workflows"}>
                <WorkflowIcon size={"16"} ></WorkflowIcon>
           </MainButtonforsidebar>
           <MainButtonforsidebar onclick={()=> Router.push("/credentials")} size="small"  name={"Credentials"}>
                <Locksvg size={"16"} ></Locksvg>
           </MainButtonforsidebar>
           <MainButtonforsidebar onclick={()=>Router.push("/executions")} size="small"  name={"Executions"}>
                <Execution size={"18"} ></Execution>
           </MainButtonforsidebar>
        </div>
        <div className="w-full">
            <Me2 me={me}></Me2>
        </div>
     </div>
}