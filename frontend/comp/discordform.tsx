import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "./buttons/input"
import { BigInput } from "./biggerinput"
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative"
import { Secondarybutton } from "./buttons/secondarybutton"
import { Cross } from "./svg/allsvg"

export default function DiscordForm({nodes,setformDetail,setNodes,formDetail}:{nodes:any,setNodes:any,setformDetail:Dispatch<SetStateAction<any>>,formDetail:any}){
        const initialValue = {variableName:"",webhookUrl:"",content:"",username:""}
        const [formdata,setformdata] = useState<{variableName:string,webhookUrl:string,content:string,username:string}>(initialValue)
        useEffect(()=>{
            if (nodes.length > 0) {
                const selectednodemetadata = nodes.filter((a:any)=>{ return a.id === formDetail.nodeid})[0]?.data.metadata
                if(selectednodemetadata){
                    setformdata({...initialValue , ...selectednodemetadata})
                }else{
                    setformdata(initialValue)
                }
            }
        },[formDetail.nodeid,nodes])
        return <div className={` transition duration-300 ease-initial ${ formDetail.name == "discord" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
                <div className={` transition duration-300 ${ formDetail.name  == "discord" ?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
                    <div className={`p-6 `} >
                        <div className="flex w-full justify-between items-center ">
                             <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name}</div>
                             <div onClick={()=>{
                                setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                                setformdata(initialValue)
                              }} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                        </div>
                        <div className="">
                         <div className="my-6 flex flex-col gap-6 w-115 overflow-y-scroll max-h-100 p-2 ">
                            <div>
                                <Input placeholder={`my-Discord-variable`} name="Variable Name" state={formdata.variableName} statesetter={(a)=>{
                                     setformdata((prev:any)=>{
                                         return {...prev , variableName : a }
                                     })
                                }}></Input>
                                <div className="mt-1 text-xs">{`Name of the variable to store the response :{{$My-Discord-response.text}}`}</div>
                            </div>
                            <div>
                                <Input placeholder={`http://discort.com/api/webhooks/...`} name="Webhook Url" state={formdata.webhookUrl} statesetter={(a)=>{
                                     setformdata((prev:any)=>{
                                         return {...prev , webhookUrl : a }
                                     })
                                }}></Input>
                                <div className="mt-1 text-xs">{`Get this from Discord Channel Settings - Integrations - New Webhook`}</div>
                            </div>
                            
                            
                            <div>
                               <BigInput placeholder="Summary: {{myGemini:text}}" name="Content" state={formdata.content} statesetter={(a)=>{
                                     setformdata((prev:any)=>{
                                         return {...prev , content : a }
                                     })
                                }}></BigInput> 
                               <div className=" text-xs">{"The message to send. Use {{variables}} for simple values or {{json variable}} to stringify objects"}</div>
                            </div>
                            <div>
                                <Input placeholder={`automation-bot`} name="Username (Optional)" state={formdata.username} statesetter={(a)=>{
                                     setformdata((prev:any)=>{
                                         return {...prev , username : a }
                                     })
                                }}></Input>
                                <div className="mt-1 text-xs">{`The username to use for the webhook`}</div>
                            </div>
                         </div> 
                    </div>
                        <div  className="flex gap-2 w-full">
                            <div onClick={()=>{
                                setNodes((prev:any)=>{
                                     return prev.map((n:any)=>{
                                           if (n.id === formDetail.nodeid) {
                                              return { ...n , data : { ...n.data , metadata : formdata }}
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
                                    setformDetail((a:any)=>{ return {nodeid : "" , name:"",open:false } })
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



                    


    }