import { Dispatch, SetStateAction, useState } from "react";
import { MainButton } from "./buttons/mainbutton";
import {  Add, AddwithBorder, Execution, Locksvg, WorkflowIcon } from "./svg/allsvg";
import { ThemeProvider } from "./theme-provider";
import { Me, Me2 } from "./me";
import { CreateButton } from "./buttons/createbutton";




export function Sidebar({setcard,card}:{setcard : Dispatch<SetStateAction<string>> , card: string}){

     return <div className="border-r border-r-brand-border dark:border-r-dark-border  max-w-62 w-full px-4  normal font-semibold flex flex-col justify-between  gap-5 pb-10">
        <div className="w-full ">
            <Me></Me>
        </div>
        <div onClick={()=>{setcard("Create")}}>
          <CreateButton></CreateButton>
        </div>
        <div className="flex flex-col gap-2 flex-2">
           <MainButton onclick={()=>{setcard("Workflows")}} size="small" state={card} name={"Workflows"}>
                <WorkflowIcon size={"16"} ></WorkflowIcon>
           </MainButton>
           <MainButton onclick={()=>{setcard("Credentials")}} size="small" state={card} name={"Credentials"}>
                <Locksvg size={"16"} ></Locksvg>
           </MainButton>
           <MainButton onclick={()=>{setcard("Executions")}} size="small" state={card} name={"Executions"}>
                <Execution size={"18"} ></Execution>
           </MainButton>
           
        </div>
        <div className="w-full">
            <Me2></Me2>
        </div>
     </div>
}