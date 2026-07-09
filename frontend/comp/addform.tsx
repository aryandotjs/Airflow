import { Children, Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { Opneframe } from "./openframe";
import { Cross } from "./svg/allsvg";
import { Secondarybutton } from "./buttons/secondarybutton";
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative";


export function Addform({children , callback , name ,setformopen, formopen , buttonname }:{buttonname:string,children:ReactNode ,name :string , setformopen : Dispatch<SetStateAction<boolean>>,formopen :boolean , callback : any}){
   
     return <div className={` transition duration-300 ease-initial ${formopen ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div className={` transition duration-300 ${formopen ?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="text-[17px] font-semibold dark:text-brand-bg ">{name}</div>
                     <div onClick={()=>{setformopen(!open)}} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                {children}
                <div  className="flex gap-2 w-full">
                    <div onClick={callback} className="h-8 w-30 transition-all duration-150 active:scale-95">
                        <SecondarybuttonNegative>
                            <div className=" px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                {buttonname}
                            </div>
                        </SecondarybuttonNegative>
                    </div>
                    <div onClick={()=>{setformopen(!open)}} className="h-8 w-30 transition-all duration-150 active:scale-95 ">
                        <Secondarybutton>
                            <div className=" px-1  text-sm pb-0.5">
                                Cancle
                            </div>
                        </Secondarybutton>
                    </div>
                </div>
              </div>
        </div>
     </div>
}
   