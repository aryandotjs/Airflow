import { Dispatch, SetStateAction, useState } from "react"
import { OpenerButton } from "./buttons/openerButton"
import { OpenOptions } from "./openoptions"

export function OpenerBoxWithOptions({options ,simplefilter ,setsimplefilter }:{options:string[],simplefilter : string ,setsimplefilter : Dispatch<SetStateAction<string>>}){
    const [open , setopen] = useState(false) 

    return <div className="w-full relative z-10" >
             <OpenerButton simplefilter={simplefilter} open={open} setopen={setopen}></OpenerButton>
                <div className={`absolute w-full top-7 transition duration-150 ${open ? "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                <OpenOptions simplefilter={simplefilter} open={open} setopen={setopen} options={options} setsimplefilter={setsimplefilter}>
                </OpenOptions>
                </div>
        </div>
}