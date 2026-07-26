import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "./buttons/input"
import { BigInput } from "./biggerinput"
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative"
import { Secondarybutton } from "./buttons/secondarybutton"
import { Cross } from "./svg/allsvg"
export function ManualTriggerForm({
    nodes,
    setNodes,
  setformDetail,
  formDetail,
}: {
     nodes:any,
    setNodes:any,
  setformDetail: Dispatch<SetStateAction<any>>;
  formDetail: any;
}) {

  return (<div className={` transition duration-300 ease-initial ${formDetail.name == "Trigger-manually" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div className={` transition duration-300 ${formDetail.name == "Trigger-manually"?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name}</div>
                     <div onClick={()=>{
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                     }} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                <div className="my-6 text-sm flex flex-col gap-6 w-115 overflow-y-scroll max-h-100 p-2">
                    trigger this workflow by clicking on the node                        
                </div>
                <div  className="flex gap-2 w-full">
                    <div onClick={()=>{
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                    }} className="h-8 w-30 transition-all duration-150 active:scale-95 ">
                        <Secondarybutton>
                            <div className=" px-1  text-sm pb-0.5">
                                Cancle
                            </div>
                        </Secondarybutton>
                    </div>
                </div>
              </div>
        </div>
     </div>
   


  );
}