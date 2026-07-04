
import { ReactNode } from "react";
import { Email, Webhook, WorkflowIcon } from "./svg/allsvg";

export function SvgforActionsTriggers({ name , size } : { name?:string , size :string}){
     return <div className={``}>
            {
            name === "Webhook" ? <Webhook size={size}></Webhook> :
            name === "Email" ? <Email size={size}></Email> :
            name === "Workflow" ? <WorkflowIcon size={size}></WorkflowIcon>
            : ""}
     </div>
} 