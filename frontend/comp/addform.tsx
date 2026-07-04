import { Children, Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { Opneframe } from "./openframe";
import { Cross } from "./svg/allsvg";
import { Secondarybutton } from "./buttons/secondarybutton";
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative";


export function Addform({children , callback , name ,setformopen, formopen , buttonname }:{buttonname:string,children:ReactNode ,name :string , setformopen : Dispatch<SetStateAction<boolean>>,formopen :boolean , callback : any}){
   
     return <div className="fixed flex w-full h-full md:inset-0 justify-center items-center bg-slate-100/70 dark:bg-black/70 z-20">
        <div className=" border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg">
              <div className="p-6">
                <div className="flex w-full justify-between items-center ">
                     <div className="text-lg font-semibold">{name}</div>
                     <div onClick={()=>{setformopen(!open)}} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                {children}
                <div  className="flex gap-3 w-full">
                    <div onClick={callback} className="h-9.5 w-30 transition-all duration-150 active:scale-95">
                        <SecondarybuttonNegative>
                            <div className="text-base px-2">
                                {buttonname}
                            </div>
                        </SecondarybuttonNegative>
                    </div>
                    <div onClick={()=>{setformopen(!open)}} className="h-9.5 w-30 transition-all duration-150 active:scale-95 ">
                        <Secondarybutton>
                            <div className="text-base px-2">
                                Cancle
                            </div>
                        </Secondarybutton>
                    </div>
                </div>
              </div>
        </div>
     </div>
}
   