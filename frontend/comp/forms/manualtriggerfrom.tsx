import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Input } from "../buttons/input"
import { BigInput } from "../biggerinput"
import { SecondarybuttonNegative } from "../buttons/secondarybuttonnegative"
import { Secondarybutton } from "../buttons/secondarybutton"
import { Copy, Cross } from "../svg/allsvg"
import { Node } from "@xyflow/react"
import { formdetailtype } from "../ReactWorkflow"
export function ManualTriggerForm({
    nodes,
    setNodes,
    setformDetail,
    formDetail,
}: {
    nodes:Node[],
    setNodes:Dispatch<SetStateAction<Node[]>>,
    setformDetail: Dispatch<SetStateAction<formdetailtype>>;
    formDetail: formdetailtype;
}) {

const initialValue = {data:""}

    const [formdata,setformdata] = useState(initialValue)

        useEffect(()=>{
            if (nodes.length > 0) {
                const selectednodemetadata = nodes.filter((a)=>{ return a.id === formDetail.nodeid})[0]?.data.metadata
                if(selectednodemetadata){
                    setformdata({...initialValue , ...selectednodemetadata})
                }else{
                    setformdata(initialValue)
                }
            }
        },[formDetail.nodeid,nodes.length])


     const [errors, setErrors] = useState<Record<string,string>>({});
        function validateForm(){
            const newError:Record<string,string> = {}
           
            if (formdata.data?.trim()) {
                try {
                    JSON.parse(formdata.data);
                } catch {
                    newError.data = "Invalid JSON";
            }
        }
            setErrors(newError)
            return Object.keys(newError).length === 0;
        }
        
        const openmodalrefmanual = useRef<HTMLDivElement>(null)
                     
        useEffect(()=>{
            if (formDetail.name !== "Trigger-manually") {
                return;
            }

            const clickeventfunc = (a:MouseEvent) => {
                if (openmodalrefmanual.current && !openmodalrefmanual.current.contains(a.target as globalThis.Node)) {
                        setformDetail({nodeid:"" , name:"",open:false } )
                }
            }
            document.addEventListener("mousedown",clickeventfunc)
            return ()=>{
                document.removeEventListener("mousedown",clickeventfunc)
            }
        },[formDetail.name])


  return (<div className={` transition duration-100 ease-initial ${formDetail.name == "Trigger-manually" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex  h-full inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div ref={openmodalrefmanual} className={` transition duration-100 ${formDetail.name == "Trigger-manually"?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex  justify-between items-center ">
                     <div className="flex gap-1 items-center ">
                              <div className="text-[17px] font-semibold dark:text-brand-bg">{formDetail.name}</div>
                              {/* <img className='h-6' src={"/actiontriggerimages/Trigger-manually.png"}></img> */}
                     </div>
                     <div onClick={()=>{
                        setformDetail((a)=>{ return {nodeid:"" , name:"",open:false } })
                     }} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                <div className="my-1 text-xs flex flex-col gap-6 w-70 md:w-115 overflow-y-scroll max-h-100 ">
                    trigger this workflow by clicking on the node                        
                </div>
                <div  className="my-6 flex flex-col gap-6 w-70 md:w-115 overflow-y-scroll max-h-70 p-2 ">
                    <div>
                        <BigInput  placeholder={`{\n   "user Id" : "123",\n    "name": "Aryan",\n    "items": "AI automation"\n}`} 
                        name="Trigger Data" state={formdata.data} statesetter={(a)=>{setformdata((prev)=>{return {...prev , data :a}})}}/>
                         {errors.data&&
                                        <div className="mt-1 text-xs text-red-500">
                                        {errors.data}
                                    </div>}
                        <div className="text-xs">
                            {"Enter JSON data to provide input to the workflow."}
                        </div>
                        <div className="flex gap-1 items-center">
                            <div  className="text-xs flex gap-1">
                                <div> {"use context in next nodes as "}</div>
                                <div className="dark:text-brand-bg text-brand-dark-bg"> {"{{Trigger-manually.data.yourObjectKey}} "}</div>
                            </div>
                             <button 
                                onClick={()=>{navigator.clipboard.writeText(`{{Trigger-manually.data.yourObjectKey}}`)}}
                                    className="transition-all active:scale-80 duration-50  text-[#71767B]   hover:dark:bg-[#2C3034] hover:bg-[#E9E9E9] rounded-md p-0.5 z-10"
                                >
                                <Copy size="19"></Copy>
                                </button>
                        </div>
                    </div>
                </div>
                
                <div  className="flex gap-2 ">
                    <div onClick={()=>{
                        if (!validateForm()) {
                            return
                        }
                        setNodes((prev)=>{
                                return prev.map((n)=>{
                                    if (n.id === formDetail.nodeid) {
                                        return { ...n , data : { ...n.data , metadata : formdata}}
                                    }
                                    return n ;
                                })
                        })
                        setformDetail((a)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
                    }} className="h-8 w-30 transition-all duration-50 active:scale-95">
                        <SecondarybuttonNegative>
                            <div className=" px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                Save
                            </div>
                        </SecondarybuttonNegative>
                    </div>
                    <div onClick={()=>{
                        setformDetail((a)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
                    }} className="h-8 w-30 transition-all duration-50 active:scale-95 ">
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