import { ReactNode } from "react";
import { Opneframe } from "./openframe";

export function Toast({isError}:{isError:boolean}){
     return <div className={`w-full flex items-center px-3 border   rounded-xl h-25  bg-brand-bg dark:bg-brand-dark-bg overflow-hidden

        ${isError ? "" : "border-[#144A31] dark:border-[#2C3034]"}
     `}>
     </div>
     
     
     
     
   //   <div className=" w-full flex items-center px-3 border  border-[#C6C6C6] dark:border-[#2C3034] rounded-xl h-25  bg-brand-bg dark:bg-brand-dark-bg overflow-hidden ">
   //      {children}
   //   </div>
}

  {/* <div className={` transition-all bg-red-50 duration-300 ease-in-out 
                ${ toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-13 pointer-events-none" }`}>
                    <Toast>
                        <div className="flex items-center gap-2"> 
                            <div className="flex items-center justify-center rounded-full bg-black text-white  dark:bg-[#151619] h-5 w-5">
                            <Check size="13"></Check>
                            </div>
                            <div className="text-sm">{toast.mess}</div>
                        </div>   
                    </Toast>
            </div> */}