import { Dispatch, SetStateAction, useState } from "react"
import { OpenerButton } from "./buttons/openerButton"
import { OpenOptions } from "./openoptions"

export function OpenerBoxWithOptions({options ,simplefilter ,setsimplefilter }:{options:string[],simplefilter : string ,setsimplefilter : Dispatch<SetStateAction<string>>}){
    const [open , setopen] = useState(false) 

    return <div className="w-full relative" >
             <OpenerButton simplefilter={simplefilter} open={open} setopen={setopen}></OpenerButton>
                <div className="absolute w-full top-10">
                <OpenOptions simplefilter={simplefilter} open={open} setopen={setopen} options={options} setsimplefilter={setsimplefilter}>

                </OpenOptions>
                </div>
        </div>
}