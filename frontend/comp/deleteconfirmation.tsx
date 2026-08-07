import { Dispatch, ReactNode, SetStateAction } from "react";
import { Addform } from "./addform";

export function DeleteConfirm({
    formopen,
    setformopen,
    name,
    buttonname,
    children,
    callback
 }:{
    formopen:boolean,
    setformopen:Dispatch<SetStateAction<boolean>>,
    name:string,
    buttonname:string,
    children:ReactNode,
    callback : ()=>void
}){
    return <div className="bg-red-300">
        <Addform manualbutton={true} callback={callback}  name={name} formopen={formopen} buttonname={buttonname} setformopen={setformopen}>
                    {children}
        </Addform>
    </div>
}

export function Deletebutton({onclick , name , className } : { onclick? : ()=> void  , name?:string , className?:string}){
     return <div onClick={onclick} className={`border  dark:border-[#2D040B] h-full border-[#FCE9EA] flex justify-center  cursor-pointer text-[#DC686C] bg-[#FCE9EA] dark:text-[#FF9592] dark:bg-[#2D040B] rounded-xl text-center px-2.5 flex-col tracking-normal text-sm font-medium ${className}`}>
      <div className="flex w-full gap-2 items-center">
          {name} 
      </div>
     </div>
} 

