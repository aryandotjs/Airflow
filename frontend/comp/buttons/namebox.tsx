import { ReactNode } from "react";

export function Namebox({word , children } : {word?:string ,children : ReactNode}){
     return <div className="bg-[#C6C6C6] dark:bg-[#2C3034] text-[#404040] dark:text-[#55595C] h-5  w-5 rounded-md flex justify-center items-center text-xs">
         {word? word : ""}{children?children:""}
     </div>
}