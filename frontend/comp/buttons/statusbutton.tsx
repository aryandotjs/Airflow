import { ReactNode } from "react";


export function StatusButton({children , status ,small = false } : {  children? : ReactNode , status:string , small? : boolean}){
     return <div className={`  flex justify-center  cursor-pointer leading-snug  rounded-lg text-center line-h  tracking-normal text-xs font-medium
      ${status === "success" ? "text-[#1E8256] bg-[#E4F4E9] dark:text-[#3BD88C] dark:bg-[#041E12]" : 
        status === "failed" ?  "text-[#CE292E] bg-[#FCE9EA] dark:text-[#FF9592] dark:bg-[#2D040B]" :
        status === "active" ? "text-[#1E8256] bg-[#E4F4E9] dark:text-[#3BD88C] dark:bg-[#041E12]" : 
        status === "paused" ?  "text-[#0C74CE] bg-[#E4F2FC] dark:text-[#70B8FF] dark:bg-[#001B3A]" :
        status === "draft" ?  "text-[#333333] bg-[#EEEEEE] dark:text-[#A1A4A5] dark:bg-[#191B1E]" :
        status === "pending" ?  "text-[#333333] bg-[#EEEEEE] dark:text-[#A1A4A5] dark:bg-[#191B1E]" :
        status === "running" ?  "text-[#0C74CE] bg-[#E4F2FC] dark:text-[#70B8FF] dark:bg-[#001B3A]" :
        status === "disabled" ?  "text-[#333333] bg-[#EEEEEE] dark:text-[#A1A4A5] dark:bg-[#191B1E]" :""
      }`}> 
      <div className="flex w-full text-xs items-center my-0.5 mx-2">
            {status[0].toUpperCase()}{status.slice(1)}
      </div>
     </div>
} 

