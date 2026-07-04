import { ReactNode } from "react";
import { Opneframe } from "./openframe";

export function Toast({children}:{children:ReactNode}){
     return <div className=" w-65 flex items-center px-3 border  border-[#C6C6C6] dark:border-[#2C3034] rounded-xl h-10  bg-brand-bg dark:bg-brand-dark-bg overflow-hidden ">
        {children}
     </div>
}