import { useState } from "react";
import { MainButton } from "./buttons/mainbutton";
import { Openup } from "./svg/allsvg";
import { OpenComp } from "./opencomp";


export function Me({me}:any){
     return <div className="h-18 flex items-center w-full ">
        <div className={`transition duration-100  ease-in-out flex  justify-center  cursor-pointer hover:bg-[#E9E9E9] dark:hover:text-[#F0F0F0] dark:hover:bg-[#151619] rounded-xl text-center flex-col font-medium text-sm h-10 w-full `}>
          <div className={`  flex w-full gap-2.5  pl-3 items-center`} >
             <div className="h-6 w-6 rounded-md items-center justify-center  pt-1 text-[11px] font-bold text-white bg-linear-to-br from-[#1D9BF0] to-[#085A9E]">
                 {me?.name?.[0]?.toUpperCase() || "U"}
             </div>
             <div className="hidden lg:block max-w-34 text-sm overflow-hidden">
              {me?.email ?? "username"}
             </div>
          </div>
     </div>
     </div>
}

export function Me2({me}:any){
     const [open , setopen] =  useState(false)
     return <div onClick={()=> setopen(!open)} className="relative h-15 flex items-center justify-center select-none ">
          <div className="flex justify-center w-9  lg:justify-between h-10 p-0.5 lg:p-1.5   items-center  border-2 dark:border-[#151619] lg:w-full rounded-2xl border-[#C6C6C6]  lg:pr-3 dark:hover:bg-[#151619] hover:bg-[#E9E9E9] ">
            <div className="hidden lg:block  h-6 w-6 rounded-full bg-linear-to-r  items-center justify-center from-[#E9E9E9] to-[#C6C6C6] dark:bg-linear-to-r dark:from-[#151619] dark:to-[#2C3034] pl-2">{"A"}</div>
            <div className="hidden lg:block  max-w-30 text-sm overflow-hidden">{me?.email?? "username"}</div>
            <div className="flex justify-center items-center ">
             <Openup size="20"></Openup>
            </div>
          </div>
          {open? <div className="absolute top-[-34] lg:w-full"> <OpenComp></OpenComp> </div> : ""}
          
        </div>
}

