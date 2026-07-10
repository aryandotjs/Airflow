import { Dispatch , ReactNode, SetStateAction, useState } from "react"
import { Secondarybutton } from "./secondarybutton"
import { DownArrow, UpArrow } from "../svg/allsvg"


export function OpenerButton({open ,setopen, children,simplefilter }:{simplefilter:string|ReactNode ,open:boolean ,setopen : Dispatch<SetStateAction<boolean>> ,children? : ReactNode}){
    return <div className=" h-8 w-full select-none" onClick={()=>{setopen(!open)}}>
                <Secondarybutton onclick={()=>{}} name="" className="hover:bg-[#F4F4F4] dark:hover:bg-[#212327]">
                    <div className="flex h-full justify-between w-full items-center text-xs">
                        {children?<div>{children}</div> : ""}
                        <div>{simplefilter}</div>
                        {open?<UpArrow size="16"></UpArrow> :<DownArrow size="16"></DownArrow>}
                    </div>
            </Secondarybutton>
    </div>
}