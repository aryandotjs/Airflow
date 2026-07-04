import { useState } from "react";
import { MainButton } from "./buttons/mainbutton";
import { Openup } from "./svg/allsvg";
import { OpenComp } from "./opencomp";


export function Me(){
     return <div className="h-15 flex items-center w-full ">
        <MainButton name={"aryanloahrchawand"} size="big"> 
             <div className="h-6 w-6 rounded-md flex items-center justify-center text-[11px] font-bold text-white bg-gradient-to-br from-[#1D9BF0] to-[#085A9E]">
                 {"A"}
             </div>
        </MainButton>
     </div>
}

export function Me2(){
     const [open , setopen] =  useState(false)
     return <div onClick={()=> setopen(!open)} className="h-15 flex items-center w-full select-none ">
          <div className="border-2 dark:border-[#151619] w-full rounded-2xl border-[#C6C6C6] flex pr-3 dark:hover:bg-[#151619] hover:bg-[#E9E9E9] ">
            <MainButton  name={"aryanloahrchawand"} size="small"> 
               <div className="h-6 w-6 rounded-full bg-linear-to-r from-[#E9E9E9] to-[#C6C6C6] dark:bg-linear-to-r dark:from-[#151619] dark:to-[#2C3034]">{"A"}</div>
            </MainButton>
            <div className="flex justify-center items-center ">
             <Openup size="20"></Openup>
            </div>
          </div>
          {open? <OpenComp></OpenComp> : ""}
          
        </div>
}

