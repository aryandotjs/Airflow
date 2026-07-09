"use client"


import { Credentials } from "@/comp/credentials";
import { Executions } from "@/comp/executions";
import { Sidebar } from "@/comp/sidebar";
import { ThemeProvider } from "@/comp/theme-provider";
import { Toast } from "@/comp/toast";
import { Workflows } from "@/comp/workflows";
import { CreateZap } from "@/comp/Zapcreate";
import { useEffect, useState } from "react";

// interface Zap {
//     "id": string,
//     "triggerId": string,
//     "userId": number,
//     "actions": {
//         "id": string,
//         "zapId": string,
//         "actionId": string,
//         "sortingOrder": number,
//         "type": {
//             "id": string,
//             "name": string
//             "image": string
//         }
//     }[],
//     "trigger": {
//         "id": string,
//         "zapId": string,
//         "triggerId": string,
//         "type": {
//             "id": string,
//             "name": string,
//             "image": string
//         }
//     }
// }
type Toasts = {
        id : number ,
        isError: boolean,
        isbig: boolean,
        message: string,
        submessage: string,
        show: boolean
}[] 
export default function() {
    const [card,setcard]= useState("Executions")
    const [toasts,settoasts] = useState<Toasts>([])
    
    return <div className="flex h-screen ">
          <Sidebar setcard={setcard} card={card}></Sidebar>
          <div className="flex-1 ">
            <div className="border-b border-b-brand-border dark:border-b-dark-border  h-15 flex items-center flex-row-reverse px-7 gap-6 select-none">
                <div className="flex h-8 ">
                    <ThemeProvider></ThemeProvider>
                </div>
            </div>
            <div className="relative">
                <div className=" h-158  overflow-y-auto  [&::-webkit-scrollbar]:hidden ">
                    {card === "Credentials" ? <Credentials card={card} settoasts={settoasts}></Credentials>  : ""}
                    {card === "Create" ? <CreateZap card={card}></CreateZap> : ""}
                    {card === "Workflows" ? <Workflows card={card} setcard={setcard} settoasts={settoasts}></Workflows> : ""}
                    {card === "Executions" ? <Executions card={card} ></Executions> : ""}
                </div>
            </div>
          </div>
        <div className="fixed bottom-6 right-6 w-90 flex flex-col-reverse gap-4 pointer-events-none ">
            {toasts.map((toast,index)=>(
                <Toast key={toast.id} settoast={settoasts} toast={toast}></Toast>
            ))}
          
        </div>

    </div>
}
