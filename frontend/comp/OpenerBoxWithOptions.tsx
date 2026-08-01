import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react"
import { OpenerButton } from "./buttons/openerButton"
import { OpenOptions } from "./openoptions"

export function OpenerBoxWithOptions({options ,simplefilter ,setsimplefilter,children }:{children? :ReactNode, options?:string[],simplefilter : string ,setsimplefilter : Dispatch<SetStateAction<any>>}){
    const [open , setopen] = useState(false) 
        const openmodalref = useRef<HTMLDivElement>(null)
        useEffect(()=>{
                const clickeventfunc = (a:any) => {
                        if (openmodalref.current && !openmodalref.current.contains(a.target)) {
                        setopen(false)
                        }
                }
                document.addEventListener("mousedown",clickeventfunc)
                return ()=>{
                        document.removeEventListener("mousedown",clickeventfunc)
                }
                },[])
    return <div ref={openmodalref} className="w-full relative z-10 " >
             <OpenerButton simplefilter={simplefilter} open={open} setopen={setopen}></OpenerButton>
                <div className={`absolute w-full top-7 transition duration-150 ${open ? "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                <OpenOptions simplefilter={simplefilter} open={open} setopen={setopen} options={options} setsimplefilter={setsimplefilter}>
                        {children}
                </OpenOptions>
                </div>
        </div>
}