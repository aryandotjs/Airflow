
import { ReactNode } from "react";
import { Email, Locksvg, Webhook, WorkflowIcon } from "./svg/allsvg";

export function SvgforActionsTriggers({ name , size } : { name?:string , size :string}){
     return <div className={``}>
            {
            name === "Webhook" ? <Webhook size={size}></Webhook> :
            name === "Email" ? <Email size={size}></Email> :
            name === "Lock" ? <Locksvg size={size}></Locksvg> :
            name === "Workflow" ? <WorkflowIcon size={size}></WorkflowIcon>
            : ""}
     </div>
} 