import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "./buttons/input"
import { BigInput } from "./biggerinput"
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative"
import { Secondarybutton } from "./buttons/secondarybutton"
import { Cross, DownArrow, UpArrow } from "./svg/allsvg"
import axios from "axios"
import VariablePicker from "./VariablePicker"
import { UseCred } from "./ReactWorkflow"
import { OpenerButton } from "./buttons/openerButton"
import { OpenOptions } from "./openoptions"
import { Opneframe } from "./openframe"
import { MainButton } from "./buttons/mainbutton"
const BACKEND_URL = "http://localhost:3001";

export default function DiscordForm({nodes,setformDetail,setNodes,formDetail}:{nodes:any,setNodes:any,setformDetail:Dispatch<SetStateAction<any>>,formDetail:any}){
        const [variables,setVariables] = useState<string[]>([])
        const initialValue = {variableName:"",webhookUrl:"",content:"",username:""}
        const [formdata,setformdata] = useState<{variableName:string,webhookUrl:string,content:string,username:string}>(initialValue)
        
        const {creds} = UseCred()
        
        useEffect(()=>{
            axios.get(`${BACKEND_URL}/api/v1/test/variables`)
            .then(res=>{
                setVariables(res.data.variables)
            })
        },[])
        
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
         
        const [open,setopen] = useState<any>(false) 


        function insertVariable(variable:string){
            setformdata((prev:any)=>{
                   return {
                     ...prev , content : prev.content + `{{${variable}}}`
                   }
            })
        }

        return <div className={` transition duration-100 ease-initial ${ formDetail.name == "discord" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
                <div className={` transition duration-100 ${ formDetail.name  == "discord" ?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
                    <div className={`p-6 `} >
                        <div className="flex w-full justify-between items-center ">
                            <div className="flex gap-1 items-center ">
                             <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name} Configuration</div>
                              <img className='h-6' src={"/actiontriggerimages/discord.png"}></img>
                            </div>
                             <div onClick={()=>{
                                setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                                setformdata(initialValue)
                              }} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                        </div>
                        <div className="">
                         <div className="my-6 flex flex-col gap-6 w-115 overflow-y-scroll max-h-100 p-2 ">
                            <div>
                                <Input placeholder={`my-Discord-variable`} name="Variable Name " state={formdata.variableName} statesetter={(a)=>{
                                     setformdata((prev:any)=>{
                                         return {...prev , variableName : a }
                                     })
                                }}></Input>
                                <div className="mt-1 text-xs">{`Name of the variable to store the response :{{$My-Discord-response.text}}`}</div>
                            </div>
                            
                            <div className="relative">
                                <div className="text-sm font-medium">
                                    Webhook
                                </div>

                                <Input placeholder={`http://discort.com/api/webhooks/...`} name="" state={formdata.webhookUrl} statesetter={(a)=>{
                                    setformdata((prev:any)=>{
                                        return {...prev , webhookUrl : a }
                                    })
                                }}></Input>
                            
                                <div className="w-10 absolute top-6 right-0 z-10  " >
                                    <div className=" h-8 w-full select-none" onClick={()=>{setopen(!open)}}>
                                                    <Secondarybutton onclick={()=>{}} name="" className="hover:bg-[#F4F4F4] dark:hover:bg-[#212327] ">
                                                        <div className="flex h-full justify-between w-full items-center text-xs  pl-0.5">
                                                            {open?<UpArrow size="16"></UpArrow> :<DownArrow size="16"></DownArrow>}
                                                        </div>
                                                </Secondarybutton>
                                    </div>
                                </div>
                                <div className="w-full absolute top-6 z-10 " >
                                    <div className={`absolute w-full top-7 transition duration-150 ${open ? "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                                        <OpenOptions simplefilter={formdata.webhookUrl??""} open={open} setopen={setopen} setsimplefilter={(a)=>{setformdata((prev:any)=>{return {...prev , AiCredentials :a}})}}>
                                                <Opneframe>
                                                        {creds.map((z:any,index)=>{
                                                            if (z.type !== "DISCORD") {
                                                                return
                                                            }
                                                            return <div 
                                                                key={index}
                                                                onClick={()=>{
                                                                    setformdata((prev:any)=>{return {...prev , webhookUrl :z.value.apikey}})
                                                                    setopen(false)
                                                                }}
                                                                className="m-1.5 ">
                                                                <MainButton>
                                                                    <div className="flex gap-2 font-normal items-center ">
                                                                        <div className="h-5 w-5">
                                                                            <img src={"/actiontriggerimages/discord.png"}></img>
                                                                        </div> 
                                                                        <div className="text-xs">{z.name}</div>
                                                                    </div>
                                                                </MainButton>
                                                            </div>
                                                        })}
                                                </Opneframe>
                                        </OpenOptions>
                                   </div>
                                </div>
                                    
                                <div className="mt-1 text-xs">{`Get this from Discord Channel Settings - Integrations - New Webhook`}</div>
                            </div>
                            
                            <div>
                               <BigInput placeholder="Summary: {{myGemini:text}}" name="Content" state={formdata.content} statesetter={(a)=>{
                                     setformdata((prev:any)=>{
                                         return {...prev , content : a }
                                     })
                                }}></BigInput> 
                               <div className=" text-xs">{"The message to send. Use {{variables}} for simple values or {{json variable}} to stringify objects"}</div>
                               {/* <VariablePicker
                                    variable={variables}
                                    onInsert={insertVariable}
                                /> */}
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