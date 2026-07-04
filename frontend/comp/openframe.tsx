import { ReactNode } from "react";

export function Opneframe({children}:{children:ReactNode}){
     return <div className="border border-[#C6C6C6] dark:border-[#2C3034] rounded-2xl w-full bg-brand-bg dark:bg-brand-dark-bg overflow-hidden shadow-xl">
              {children}
         </div>
}