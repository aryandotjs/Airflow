import { Dispatch, SetStateAction } from "react";
import { Secondarybutton } from "./secondarybutton";


export function Input({ name ,placeholder ,statesetter , state}:{state : string , statesetter : Dispatch<SetStateAction<string>>, name:string,placeholder:string }){
     return <div className="flex flex-col gap-1">
        <div className="text-sm font-medium">
           {name}
        </div>
        <div className="">
                <input onChange={(a)=> statesetter(a.target.value)} type="text" value={state??""} className="transition-all focus-visible:ring-2  duration-250  w-full h-8 outline-0 focus-visible:ring-[#D7D7D7] dark:focus-visible:ring-[#1A1D1F] dark:font-me  dark:text-brand-bg text-brand-dark-bg border border-[#C6C6C6]  dark:border-[#2C3034]  bg-[#E9E9E9] dark:bg-[#151619]  rounded-xl px-2.5 pb-0.5  text-sm dark:font-medium "  placeholder={placeholder}></input>
        </div>
     </div>
}