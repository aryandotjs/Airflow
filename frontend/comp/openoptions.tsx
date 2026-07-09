import { Dispatch , ReactNode, SetStateAction, useState } from "react"
import { Opneframe } from "./openframe"
import { Secondarybutton } from "./buttons/secondarybutton"
import { MainButton } from "./buttons/mainbutton"
import { Check } from "./svg/allsvg"



export function OpenOptions({open ,setsimplefilter, children,simplefilter , options , setopen }:{simplefilter:string ,open:boolean ,setopen : Dispatch<SetStateAction<boolean>> ,setsimplefilter : Dispatch<SetStateAction<string>> ,children? : ReactNode , options? : string[]}){
    return <div className={`h-full w-full `} onClick={()=>{}}>
             <div>{options?
            <Opneframe> {options.map((a:string,b)=>{ 
                 return <div key={b} className="h-8 m-1" onClick={()=>{
                            setsimplefilter(a)
                            setopen(!open) }}>
                            <MainButton name="">
                                <div className="flex justify-between items-center w-full mr-2 text-xs">
                                    <div >{a}</div>
                                    {a === simplefilter ? <Check size="16"></Check> : ""}
                                </div>
                            </MainButton>
                         </div>
                })}
            </Opneframe>
                    : children} </div> 
         </div>      
}

