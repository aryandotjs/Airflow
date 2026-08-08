import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Input } from "../buttons/input"
import { BigInput } from "../biggerinput"
import { SecondarybuttonNegative } from "../buttons/secondarybuttonnegative"
import { Secondarybutton } from "../buttons/secondarybutton"
import { Copy, Cross } from "../svg/allsvg"
import { OpenerButton } from "../buttons/openerButton"
import { MainButton } from "../buttons/mainbutton"
import { OpenOptions } from "../openoptions"
import { Opneframe } from "../openframe"
import { Node } from "@xyflow/react"
import { formdetailtype } from "../ReactWorkflow"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export function WebhookForm({
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

     
    const initialValue = {Method:"POST",WebhookId:""}
    const [open,setopen] = useState<boolean>(false) 

    const [formdata,setformdata] = useState<{Method:string,WebhookId:string}>(initialValue)
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

        const openmodalrefwebhook = useRef<HTMLDivElement>(null)
                     
        useEffect(()=>{
            if (formDetail.name !== "Webhook") {
                return;
            }

            const clickeventfunc = (a:MouseEvent) => {
                if (openmodalrefwebhook.current && !openmodalrefwebhook.current.contains(a.target as globalThis.Node)) {
                        setformDetail({nodeid:"" , name:"",open:false } )
                }
            }
            document.addEventListener("mousedown",clickeventfunc)
            return ()=>{
                document.removeEventListener("mousedown",clickeventfunc)
            }
        },[formDetail.name])

       

  return (<div className={` transition duration-100 ease-initial ${formDetail.name == "Webhook" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div ref={openmodalrefwebhook} className={` transition duration-100 ${formDetail.name == "Webhook"?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="flex gap-2 items-center ">
                              <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name} </div>
                               <img className='h-5 dark:hidden' src={"/actiontriggerimages/webhook.png"}></img>
                              <img className='h-5 hidden dark:block' src={"/actiontriggerimages/darkwebhook.png"}></img>
                     </div>
                     <div onClick={()=>{
                        setformDetail((a)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
                     }} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                       <div className="my-6 flex flex-col gap-6 w-70 md:w-115 overflow-y-scroll max-h-100 p-2 ">
                            {/* <div>
                                <Input placeholder={`Variable-name`} name="Variable Name (optional)" state={formdata.variableName} statesetter={(a)=>{
                                     setformdata((prev)=>{
                                         return {...prev , variableName : a }
                                     })
                                }}></Input>
                                <div className="mt-1 text-xs">{`Name of the variable to store the response :{{variableName.httpResponse.data}}`}</div>
                            </div> */}
                            <div className="w-full flex flex-col gap-1 text-sm font-medium">
                                                        <div className="">{`Method`}</div>
                                                        <div className="w-full relative z-10 " >
                                                                    <OpenerButton simplefilter={formdata.Method} open={open} setopen={setopen}></OpenerButton>
                                                                    <div className={`absolute w-full top-7 transition duration-100 ${open ? "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                                                                        <OpenOptions simplefilter={""} options={["GET","POST"]}  open={open} setopen={setopen} setsimplefilter={(a:string)=>{setformdata((prev)=>{return {...prev , Method :a}})}}>
                                                                                <Opneframe>
                                                                                        {["GET","POST"].map((z:string,index)=>{
                                                                                            return <div 
                                                                                                key={index}
                                                                                                onClick={()=>{
                                                                                                    setformdata((prev)=>{return {...prev , Method : z}})
                                                                                                    setopen(false)
                                                                                                }}
                                                                                                className="m-1.5 ">
                                                                                                <MainButton>
                                                                                                    <div className="flex gap-2 font-normal ">
                                                                                                        <div className="text-xs">{z}</div>
                                                                                                    </div>
                                                                                                </MainButton>
                                                                                            </div>
                                                                                        })}
                                                                                </Opneframe>
                                                                        </OpenOptions>
                                                                    </div>
                                                                </div>
                                                    </div>
                                                    
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-medium">
                                   {"Webhook URL"}
                                </div>
                                    <div className=" flex h-8 justify-between border border-[#C6C6C6]  dark:border-[#2C3034]  cursor-pointer bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040] rounded-xl    px-2.5 tracking-normal text-sm font-medium">
                                        <div className="w-full pt-1 overflow-x-hidden whitespace-nowrap truncate ">
                                            {formdata.WebhookId?`${BACKEND_URL}/api/v1/webhook/${formdata.WebhookId}` : "Save workflow to generate URL" }
                                        </div>
                                        <button onClick={()=>{
                                            if (formdata.WebhookId) {
                                                navigator.clipboard.writeText(`${BACKEND_URL}/api/v1/webhook/${formdata.WebhookId}`)
                                            }
                                        }}className="transition-all active:scale-80 duration-50   text-[#71767B]      rounded-md p-0.5 "
                                                            >
                                            <Copy size="19"></Copy>
                                        </button>
                                    </div>
                                    <div className=" text-xs">{`Send POST requests to this URL to trigger the workflow`}</div>
                            </div>
                            
       
                            <div className="flex gap-1 items-center">
                                <div  className="text-xs flex gap-1">
                                    <div> {"use context in next nodes as "}</div>
                                    <div className="dark:text-brand-bg text-brand-dark-bg"> {"{{Webhookpayload.body.yourObjectKey}} "}</div>
                                </div>
                                <button 
                                    onClick={()=>{navigator.clipboard.writeText(`{{Webhookpayload.body.yourObjectKey}}`)}}
                                        className="transition-all active:scale-80 duration-50  text-[#71767B]   hover:dark:bg-[#2C3034] hover:bg-[#E9E9E9] rounded-md p-0.5 z-10"
                                    >
                                    <Copy size="19"></Copy>
                                </button>
                            </div>
                            {/* {formdata.Method === "POST" || formdata.Method === "PUT" ?
                            <div>
                                <BigInput 
                                      placeholder={"{\n    user Id: {{httpResponse.data.id}},\n    name: {{httpResponse.data.name}},\n    items: {{httpResponse.data.items}}\n}"} 
                                     name="RequestBody" state={formdata.RequestBody} statesetter={(a)=>{setformdata((prev)=>{return {...prev , RequestBody :a}})}}></BigInput> 
                                <div className=" text-xs">{"Enter JSON body or use {{variables}} for simple values or {{json variables}} to stringify objects"}</div>
                            </div>
                            : ""} */}
                         </div> 
                <div  className="flex gap-2 w-full">
                    <div onClick={()=>{
                        setNodes((prev)=>{
                                return prev.map((n)=>{
                                    if (n.id === formDetail.nodeid) {
                                        return { ...n , data : { ...n.data , metadata : formdata }}
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