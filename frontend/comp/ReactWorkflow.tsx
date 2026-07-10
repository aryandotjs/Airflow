import { metadata } from "@/app/layout";
import { ReactFlow , Node, Background, Controls, Edge, useNodesState, useEdgesState, Connection, addEdge, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import RightsideBar from "./rightsidebar";
import Trigger, { Action } from "./trigger";
import { Add } from "./svg/allsvg";
import { MainButton } from "./buttons/mainbutton";
import { Secondarybutton } from "./buttons/secondarybutton";
import { Addform } from "./addform";
import { Input } from "./buttons/input";
import { OpenerBoxWithOptions } from "./OpenerBoxWithOptions";
import axios from "axios";
import { Opneframe } from "./openframe";
import { OpenerButton } from "./buttons/openerButton";
import { OpenOptions } from "./openoptions";
import { BigInput } from "./biggerinput";

// export let InitialNodes : Node<{name :string , metadata :string , onDelete : ()=>void}>[] = [{
//     id : '1',
//     position : { x : 340 , y: 340},
//     type : "trigger",
//     data : {
//        name : "Aryan" ,
//        metadata : "",
//        onDelete : (id :string)=>{}
//     }
// }]

export let InitialNodes : Node<{name :string , metadata :string , onDelete : ()=>void}>[] = []
const BACKEND_URL = "http://localhost:3001";

export const  nodeTypes  = {
    "trigger": Trigger,
    "action" : Action
}

export const InitialEdges : Edge [] = []

function WorkflowContent(){
    const [nodes,setNodes,onNodesChange] = useNodesState(InitialNodes)
    const [edges,setEdges,onEdgesChange] = useEdgesState(InitialEdges)
    const [ sidebaropen , setsidebaropen ] = useState(false)
    
    const onConnect = useCallback((Connection:Connection)=>{
        const edge = { ...Connection , id : `${edges.length}+1`}
        setEdges(( prevEdges : any) =>  addEdge(edge,prevEdges));

    },[]) 


    // from here only for diffpur
    const {creds} = UseCred()
    const [form,setform] = useState(true)
    const [credName,setcredName] = useState("") 
    const [type,settype] = useState<any>() 
    const [open,setopen] = useState<any>(false) 
    const [systemprompt,setsystemprompt] = useState<any>("") 
    // till here only for diffpur
    
    return <div 
         className="h-160 w-322 ">
            {JSON.stringify(type)}
            <button onClick={()=>{setform(!form)}}>tucker</button>
            <RightsideBar setsidebaropen={setsidebaropen} sidebaropen={sidebaropen}></RightsideBar>
            <button onClick={()=>setsidebaropen(true)} className="absolute right-5 top-5 z-10  transition duration-100 ">
                <div className="h-8 rounded-sm  flex items-center bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040] w-8 justify-center">
                     <Add size="22"></Add>
                </div>
            </button>
            <ReactFlow
                    nodes={nodes} 
                    edges={edges} 
                    onNodesChange={onNodesChange} 
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}>
                    <Background/>
                    <Controls/>
            </ReactFlow>
            <Addform buttonname="Save" name="OpenAi Configuration" callback={()=>{}} formopen={form} setformopen={setform} >
                <div>
                     <div className="my-6 flex flex-col gap-4 w-115">
                        <div>
                            <Input placeholder="lable-OpenAi-variable" name="Variable Name" state={credName} statesetter={setcredName}></Input>
                            <div className="mt-1 text-xs">{"Name of the variable to store the response :{{myOpenAI.text}}"}</div>
                        </div>
                        <div className="w-full flex flex-col gap-1 text-sm font-medium">
                            <div className="">Type</div>
                            <div className="w-full relative z-10 " >
                                        <OpenerButton simplefilter={
                                             type ?
                                                <div className="flex gap-1 items-center">
                                                    <div className="h-5 w-5">
                                                        {type.type === "CLAUDE" ? 
                                                        <img src={"./actiontriggerimages/claude.png"}></img> :
                                                        type.type === "GEMINI" ? 
                                                        <img src={"./actiontriggerimages/gemini.png"}></img> :
                                                        type.type === "CHATGPT" ?
                                                        <img src={"./actiontriggerimages/chatgpt.png"}></img>:""}
                                                    </div> 
                                                    <div>{type.name}</div>
                                                </div> : "Select a credential"

                                                } open={open} setopen={setopen}></OpenerButton>
                                        <div className={`absolute w-full top-7 transition duration-150 ${open ? "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                                            <OpenOptions simplefilter={type} open={open} setopen={setopen} setsimplefilter={settype}>
                                                    <Opneframe>
                                                            {creds.map((z:any,index)=>{
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
                        <BigInput placeholder="mI2DyWosumKcWdkDg0GI592C0wGSUZoF" name="System Prompt (Optional)" state={systemprompt} statesetter={setsystemprompt}></BigInput> 
                           <div className="mt-1 text-xs">{"Sets the behavior of the assistant. Use {{variables}} for simple values or {{json variable}} to stringify objects"}</div>
                        </div>
                        <div>
                        <BigInput placeholder="mI2DyWosumKcWdkDg0GI592C0wGSUZoF" name="System Prompt (Optional)" state={systemprompt} statesetter={setsystemprompt}></BigInput> 
                           <div className="mt-1 text-xs">{"The prompt to send to the AI.Use{{variables}} for simple values or {{json variables}} to stringify objects"}</div>
                        </div>
                     </div> 
                </div>
            </Addform>
    </div>
}


export const UseCred =()=>{
    const [creds, setcreds] = useState([]);

    useEffect(()=>{
       axios.get(`${BACKEND_URL}/api/v1/credentials/all`, {
            // headers: {
            //     "authorization": `Bearer ${localStorage.getItem("token")}`
            // }
        })
            .then(res => {
                console.log(res.data.credential,"bus")
                setcreds(res.data.credential.sort((a:any,b:any)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
            })
    },[])
    return {
        creds
    }
}

export function ReactWorkflow(){
   return <ReactFlowProvider>
       <WorkflowContent/>
   </ReactFlowProvider>
}

