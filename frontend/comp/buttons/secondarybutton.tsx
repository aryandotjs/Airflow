import { ReactNode } from "react";

export function Secondarybutton({onclick , children , name , className ,small = false ,   } : {   onclick? : ()=> void , children : ReactNode , name?:string , className?:string , small? : boolean}){
     return <div onClick={onclick} className={ `border border-[#C6C6C6] h-full dark:border-[#2C3034] flex justify-center  cursor-pointer bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040] rounded-xl text-center ${small? "px-1.5" : "px-2.5" }  flex-col tracking-normal text-sm font-medium ${className}`}>
      <div className="flex w-full gap-2 items-center">
       {name ? name : ""}{children}
      </div>
     </div>
} 