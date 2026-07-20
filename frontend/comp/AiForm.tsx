import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { UseCred } from "./ReactWorkflow"
import { Addform } from "./addform"
import { Input } from "./buttons/input"
import { OpenerButton } from "./buttons/openerButton"
import { OpenOptions } from "./openoptions"
import { Opneframe } from "./openframe"
import { MainButton } from "./buttons/mainbutton"
import { BigInput } from "./biggerinput"

export default function AiForm({NodeFormDetail,setNodeFormDetail,AiName,AiType}:{NodeFormDetail:any,setNodeFormDetail:Dispatch<SetStateAction<any>>,AiName:string,AiType:string}){
    const {creds} = UseCred()
    const [credName,setcredName] = useState("") 
    const [type,settype] = useState<any>() 
    const [open,setopen] = useState<any>(false) 
    const [systemprompt,setsystemprompt] = useState<any>("") 
    const [userprompt,setuserprompt] = useState<any>("") 
    const [openform,setopenform] = useState(false)
    useEffect(()=>{
        if (NodeFormDetail === "claude") {
            setNodeFormDetail({ name : "claude", open :true})
        }
    },[openform])
    return <Addform buttonname="Save" name={`${AiName} Configuration`} callback={()=>{}} formopen={openform} setformopen={setopenform} >
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
                                                        <img src={"./actiontriggerimages/claude.png"}></img> :
                                                        AiType === "GEMINI" ? 
                                                        <img src={"./actiontriggerimages/gemini.png"}></img> :
                                                        AiType === "CHATGPT" ?
                                                        <img src={"./actiontriggerimages/chatgpt.png"}></img>:""}
                                                    </div> 
                                                    <div>{type.name}</div>
                                                </div> : "Select a credential"

                                                } open={open} setopen={setopen}></OpenerButton>
                                        <div className={`absolute w-full top-7 transition duration-150 ${open ? "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                                            <OpenOptions simplefilter={type} open={open} setopen={setopen} setsimplefilter={settype}>
                                                    <Opneframe>
                                                            {creds.map((z:any,index)=>{
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
                                                                                <img src={"./actiontriggerimages/claude.png"}></img> :
                                                                                z.type === "GEMINI" ? 
                                                                                <img src={"./actiontriggerimages/gemini.png"}></img> :
                                                                                z.type === "CHATGPT" ?
                                                                                <img src={"./actiontriggerimages/chatgpt.png"}></img>:""}
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
            </Addform>
}