"use client"
import { ReactFlow , Node, Background, Controls, Edge, useNodesState, useEdgesState, Connection, addEdge, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import RightsideBar from "./rightsidebar";
import Trigger, { Action } from "./trigger";
import { Add, Cross, Prev, Save } from "./svg/allsvg";
import axios from "axios";
import AiForm from "./AiForm";
import { Addform } from "./addform";
import { Input } from "./buttons/input";
import { BigInput } from "./biggerinput";
import { OpenerButton } from "./buttons/openerButton";
import { OpenOptions } from "./openoptions";
import { Opneframe } from "./openframe";
import { MainButton } from "./buttons/mainbutton";
import { Secondarybutton } from "./buttons/secondarybutton";
import { ThemeProvider } from "./theme-provider";
import { useRouter } from "next/navigation";
import { metadata } from "@/app/layout";
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative";
import DiscordForm from "./discordform";
import { GoogleSheetTriggerForm } from "./googlesheets";
import { GoogleFormTriggerForm } from "./googleform";
import { NotionTriggerForm } from "./notionform";

// export let InitialNodes : Node<{name :string , metadata :string , onDelete : (id:any)=>void}>[] = [{
//     id : '1',
//     position : { x : 340 , y: 340},
//     type : "trigger",
//     data : {
//        name : "Aryan" ,
//        metadata : "",
//        onDelete : (id)=>{}
//     }
// }]


const BACKEND_URL = "http://localhost:3001";

export const  nodeTypes  = {
    "trigger": Trigger,
    "action" : Action
}
type workflow = {
    name :string
}
export const InitialNodes : [] = []
export const InitialEdges : Edge [] = []

export function WorkflowContent({workflowid}:{workflowid:any}){
    const [formDetail, setformDetail] = useState<{name :string , open : boolean}>({name :"" , open : false});

    const [nodes,setNodes,onNodesChange] = useNodesState(InitialNodes)
    const [edges,setEdges,onEdgesChange] = useEdgesState(InitialEdges)
    const [ sidebaropen , setsidebaropen ] = useState(false)
    
    const onConnect = useCallback((connection: Connection) => {
                 setEdges((prevEdges) => addEdge(connection, prevEdges));
        }, [setEdges]);
    
    const [ wholeworkflow , setwholeworkflow ] = useState<workflow|null>()

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workflow/${workflowid}`)
            .then((a: any) => {
            setwholeworkflow(a.data)
            const structuredNodes = a.data.nodes.map((n: any) => ({
                id: n.id,
                position: n.position,
                type: n.type,
                data: {
                name: n.name,
                metadata : n.data,
                openForm : setformDetail
                },
            }));
            const structuredEdges = a.data.connections.map((c: any) => ({
                source:c.fromNodeId,
                target:c.toNodeId,
                id: `xy-edge__${c.fromNodeId}-${c.toNodeId}`
            }));

            setNodes(structuredNodes);
            setEdges(structuredEdges)
            });
    }, [workflowid]);

const Router = useRouter();
    return <div 
         className="h-160 w-full  relative">
             <div className="h-15 border-b w-full items-center justify-between  border-b-brand-border dark:border-b-dark-border   px-6  normal font-semibold flex    "> 
                <div className="flex gap-2 text-sm font-normal">
                    <div onClick={()=>Router.push("/workflows")} className="cursor-pointer">{"workflows"}</div>
                    <div>{">"}</div>
                    <div>{`${wholeworkflow?.name ?? workflowid}`}</div>
                </div>
                <div className="h-8">
                  <ThemeProvider></ThemeProvider>
                </div>
             </div>
            
            <RightsideBar setsidebaropen={setsidebaropen} sidebaropen={sidebaropen} setformDetail={setformDetail}></RightsideBar>

            <button onClick={()=>setsidebaropen(true)} className="absolute right-5 top-20 z-10  transition duration-100 ">
                <div className="h-8 rounded-sm  flex items-center bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040] w-8 justify-center">
                     <Add size="22"></Add>
                </div>
            </button>
            <button onClick={async()=>{
           
                 const response = await axios.put(`${BACKEND_URL}/api/v1/workflow/${workflowid}`,{
                        nodes , edges
                 })
                
                 Router.push("/workflows")
            }} className="absolute right-5 top-30 z-10 gap-0.5 ">
                <div className="h-8 rounded-sm px-2 active:scale-95 duration-100  flex items-center bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040] text-xs font-semibold justify-center">
                    <div>Save</div>
                     <Save size="14"></Save>
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
            <DiscordForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} ></DiscordForm>
            <GoogleSheetTriggerForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} ></GoogleSheetTriggerForm>
            <GoogleFormTriggerForm nodes={nodes} setNodes={setNodes}  setformDetail={setformDetail} formDetail={formDetail} ></GoogleFormTriggerForm>
            <NotionTriggerForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} ></NotionTriggerForm>


            <AiForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} AiName="Anthropic" AiType={"CLAUDE"}></AiForm>
            <AiForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} AiName="Gemini" AiType={"GEMINI"}></AiForm>
            <AiForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail}  AiName="OpenAi" AiType={"CHATGPT"}></AiForm>
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
                setcreds(res.data.credential.sort((a:any,b:any)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
            })
    },[])
    return {
        creds
    }
}



