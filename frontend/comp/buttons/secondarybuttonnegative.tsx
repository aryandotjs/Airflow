

import { ReactNode } from "react";

export function SecondarybuttonNegative({onclick , children , name , className } : { onclick? : ()=> void , children : ReactNode , name?:string , className?:string}){
     return <div onClick={onclick} className={`border  dark:border-[#C6C6C6] h-full border-[#2C3034] flex justify-center  cursor-pointer dark:bg-[#E9E9E9] bg-[#151619] text-[#9C9FA0] dark:text-[#404040] rounded-xl text-center px-2.5 flex-col tracking-normal text-sm font-medium ${className}`}>
      <div className="flex w-full gap-2 items-center">
       {name ? name : ""}{children}
      </div>
     </div>
} 