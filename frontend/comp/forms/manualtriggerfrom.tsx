import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "../buttons/input"
import { BigInput } from "../biggerinput"
import { SecondarybuttonNegative } from "../buttons/secondarybuttonnegative"
import { Secondarybutton } from "../buttons/secondarybutton"
import { Copy, Cross } from "../svg/allsvg"
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

const initialValue = {data:""}

    const [formdata,setformdata] = useState(initialValue)
        useEffect(()=>{
            if (nodes.length > 0) {
                const selectednodemetadata = nodes.filter((a:any)=>{ return a.id === formDetail.nodeid})[0]?.data.metadata
                if(selectednodemetadata){
                    setformdata({...initialValue , ...selectednodemetadata})
                }else{
                    setformdata(initialValue)
                }
            }
        },[formDetail.nodeid,nodes.length])

  return (<div className={` transition duration-300 ease-initial ${formDetail.name == "Trigger-manually" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
    {/* {JSON.stringify(formdata)} */}
        <div className={` transition duration-300 ${formDetail.name == "Trigger-manually"?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="flex gap-1 items-center ">
                              <div className="text-[17px] font-semibold dark:text-brand-bg">{formDetail.name}</div>
                              {/* <img className='h-6' src={"/actiontriggerimages/Trigger-manually.png"}></img> */}
                     </div>
                     <div onClick={()=>{
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                     }} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                <div className="my-1 text-xs flex flex-col gap-6 w-115 overflow-y-scroll max-h-100 ">
                    trigger this workflow by clicking on the node                        
                </div>
                <div  className="my-6 flex flex-col gap-6 w-115 overflow-y-scroll max-h-70 p-2 ">
                    <div>
                        <BigInput  placeholder={`{\n   "user Id" : "123",\n    "name": "Aryan",\n    "items": "AI automation"\n}`} 
                        name="Trigger Data" state={formdata.data} statesetter={(a)=>{setformdata((prev:any)=>{return {...prev , data :a}})}}/>

                        <div className="text-xs">
                            {"Enter JSON data to provide input to the workflow."}
                        </div>
                        <div className="flex gap-1 items-center">
                            <div  className="text-xs ">
                               {"use context as {{Trigger-manually.data.yourObjectKey}} in next nodes"}
                            </div>
                             <button 
                                onClick={()=>{navigator.clipboard.writeText(`{{Trigger-manually.data.yourObjectKey}}`)}}
                                    className="transition-all active:scale-80 duration-150  text-[#71767B] hover:text-[#E1E8ED]   hover:bg-[#2C3034] rounded-md p-0.5 z-10"
                                >
                                <Copy size="19"></Copy>
                                </button>
                        </div>
                    </div>
                </div>
                
                <div  className="flex gap-2 w-full">
                    <div onClick={()=>{
                        setNodes((prev:any)=>{
                                return prev.map((n:any)=>{
                                    if (n.id === formDetail.nodeid) {
                                        return { ...n , data : { ...n.data , metadata : formdata}}
                                    }
                                    return n ;
                                })
                        })
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
                    }} className="h-8 w-30 transition-all duration-150 active:scale-95">
                        <SecondarybuttonNegative>
                            <div className=" px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                Save
                            </div>
                        </SecondarybuttonNegative>
                    </div>
                    <div onClick={()=>{
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
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