import { ReactNode } from "react";

export function MainButton({onclick , children  ,size = "small" , state , name } : { onclick? : ()=> void , children? : ReactNode , size? : "big" | "small" ,state? :string , name? :string}){
     return <div onClick={onclick} className={`transition duration-200 ease-in-out flex justify-center  cursor-pointer hover:bg-[#E9E9E9] dark:hover:text-[#F0F0F0] dark:hover:bg-[#151619] rounded-xl text-center flex-col font-medium ${size === "small" ? "text-sm h-8 w-full" : "h-10 text-sm w-full "} ${name && state === name ? "bg-[#E9E9E9] dark:bg-[#151619]" : ""}`}>
          <div className={`flex w-full gap-1.5  pl-3 items-center ${size === "big" ?  "gap-3": "" }`}>
             {children}{name}
          </div>
     </div>
}             
export function MainRedButton({onclick , children  ,size = "small" , state , name } : { onclick? : ()=> void , children? : ReactNode , size? : "big" | "small" ,state? :string , name? :string}){
     return <div onClick={onclick} className={`transition duration-200 ease-in-out flex justify-center cursor-pointer text-[#CE292E] dark:text-[#CE292E] hover:bg-[#FCE9EA]  hover:dark:bg-[#2D040B] rounded-xl text-center flex-col font-medium ${size === "small" ? "text-sm h-8 w-full" : "h-10 text-sm w-full "} ${name && state === name ? "bg-[#E9E9E9] dark:bg-[#151619]" : ""}`}>
          <div className={`flex w-full gap-1.5  pl-3 items-center ${size === "big" ?  "gap-3": "" }`}>
             {children}{name}
          </div>
     </div>
}             

//  