import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { UseCred } from "./ReactWorkflow"
import { Addform } from "./addform"
import { Input } from "./buttons/input"
import { OpenerButton } from "./buttons/openerButton"
import { OpenOptions } from "./openoptions"
import { Opneframe } from "./openframe"
import { MainButton } from "./buttons/mainbutton"
import { BigInput } from "./biggerinput"
import { Cross } from "./svg/allsvg"
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative"
import { Secondarybutton } from "./buttons/secondarybutton"
const aimap : any = {
    "Anthropic" : "claude",
    "Gemini" : "gemini",
    "OpenAi" : "chatgpt"
}
export default function AiForm({formDetail,setformDetail,AiName,AiType}:{formDetail:any,setformDetail:Dispatch<SetStateAction<any>>,AiName:string,AiType:string}){
    const {creds} = UseCred()
    const [credName,setcredName] = useState("") 
    const [type,settype] = useState<any>() 
    const [open,setopen] = useState<any>(false) 
    const [systemprompt,setsystemprompt] = useState<any>("") 
    const [userprompt,setuserprompt] = useState<any>("") 

    return <div className={` transition duration-300 ease-initial ${formDetail.name == aimap[AiName] ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
            <div className={` transition duration-300 ${formDetail.open ?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
                <div className={`p-6 `} >
                    <div className="flex w-full justify-between items-center ">
                         <div className="text-[17px] font-semibold dark:text-brand-bg ">{`${AiName} Configuration`}</div>
                         <div onClick={()=>{setformDetail({name : "" , open :false})}} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                    </div>
                      <div className="">
                     <div className="my-6 flex flex-col gap-4 w-115 overflow-y-scroll h-100 p-2 ">
                        <div>
                            <Input placeholder={`my-${AiName}-variable`} name="Variable Name" state={credName} statesetter={setcredName}></Input>
                            <div className="mt-1 text-xs">{`Name of the variable to store the response :{{${AiName}.text}}`}</div>
                        </div>
                        <div className="w-full flex flex-col gap-1 text-sm font-medium">
                            <div className="">{`${AiName} Credentials`}</div>
                            <div className="w-full relative z-10 " >
                                        <OpenerButton simplefilter={
                                             type ?
                                                <div className="flex gap-1 items-center">
                                                    <div className="h-5 w-5">
                                                        {AiType === "CLAUDE" ? 
                                                        <img src={"/actiontriggerimages/claude.png"}></img> :
                                                        AiType === "GEMINI" ? 
                                                        <img src={"/actiontriggerimages/gemini.png"}></img> :
                                                        AiType === "CHATGPT" ?
                                                        <img src={"/actiontriggerimages/chatgpt.png"}></img>:""}
                                                    </div> 
                                                    <div>{type.name}</div>
                                                </div> : "Select a credential"

                                                } open={open} setopen={setopen}></OpenerButton>
                                        <div className={`absolute w-full top-7 transition duration-150 ${open ? "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                                            <OpenOptions simplefilter={type} open={open} setopen={setopen} setsimplefilter={settype}>
                                                    <Opneframe>
                                                            {creds.map((z:any,index)=>{
                                                                console.log("ayooo",z)
                                                                if (z.type !== AiType) {
                                                                    return
                                                                }
                                                                return <div 
                                                                    key={index}
                                                                    onClick={()=>{
                                                                        settype(z)
                                                                        setopen(false)
                                                                    }}
                                                                    className="m-1.5 ">
                                                                    <MainButton>
                                                                        <div className="flex gap-2 font-normal ">
                                                                            <div className="h-5 w-5">
                                                                                {z.type === "CLAUDE" ? 
                                                                                <img src={"/actiontriggerimages/claude.png"}></img> :
                                                                                z.type === "GEMINI" ? 
                                                                                <img src={"/actiontriggerimages/gemini.png"}></img> :
                                                                                z.type === "CHATGPT" ?
                                                                                <img src={"/actiontriggerimages/chatgpt.png"}></img>:""}
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
                        </div>
                        <div>
                           <BigInput placeholder="Act as a discort admin ...." name="System Prompt (Optional)" state={systemprompt} statesetter={setsystemprompt}></BigInput> 
                           <div className=" text-xs">{"Sets the behavior of the assistant. Use {{variables}} for simple values or {{json variable}} to stringify objects"}</div>
                        </div>
                        <div>
                           <BigInput placeholder="Summerize this text : {{jsonhttpreponse.data}}" name="System Prompt (Optional)" state={userprompt} statesetter={setuserprompt}></BigInput> 
                           <div className=" text-xs">{"The prompt to send to the AI.Use{{variables}} for simple values or {{json variables}} to stringify objects"}</div>
                        </div>
                     </div> 
                </div>
                    <div  className="flex gap-2 w-full">
                        <div onClick={()=>{}} className="h-8 w-30 transition-all duration-150 active:scale-95">
                            <SecondarybuttonNegative>
                                <div className=" px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                    Save
                                </div>
                            </SecondarybuttonNegative>
                        </div>
                        <div onClick={()=>{ setformDetail( {name : "" , open :false}) }} className="h-8 w-30 transition-all duration-150 active:scale-95 ">
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