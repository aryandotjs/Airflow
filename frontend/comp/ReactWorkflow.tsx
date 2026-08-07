"use client"
import { ReactFlow , Node, Background, Controls, Edge, useNodesState, useEdgesState, Connection, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {  useCallback, useEffect, useState } from "react";
import RightsideBar from "./rightsidebar";
import Trigger, { Action } from "./trigger";
import { Add, Cross, Prev, Save, Webhook } from "./svg/allsvg";
import { AxiosError } from "axios";
import AiForm from "./forms/AiForm";
import { ThemeProvider } from "./theme-provider";
import { useRouter } from "next/navigation";
import DiscordForm from "./forms/discordform";
// import { GoogleSheetTriggerForm } from "./forms/googlesheets";
// import { GoogleFormTriggerForm } from "./forms/googleform";
// import { NotionTriggerForm } from "./forms/notionform";
import useToastSetterRemover from "./toastfunction";
import { HttpForm } from "./forms/httpfrom";
import { ManualTriggerForm } from "./forms/manualtriggerfrom";
import { WebhookForm } from "./forms/webhookform";
import { api } from "@/lib/api";

export type Workflow = {

    id:string
    name:string
    runs:number
    status:"ACTIVE" | "PAUSED" | "DRAFT"
    userId:string
    createdAt:string
    updatedAt:string
    nodes:WorkflowNode[]
    connections:Workflowconnection[]
}
 export type Workflowconnection =  {
        id: string
        workflowId: string
        fromNodeId: string
        toNodeId: string
        fromOutput: string
        toInput: string
        createdAt: string
        updatedAt: string
    }

export type WorkflowNode = {
    id:string
    workflowId:string
    name:string
    type:string
    position:{
        x:number
        y:number
    }
    data: Record<string, any>
    credentialId:string | null
    createdAt:string
    updatedAt:string
}
export type Credential = {
   createdAt: string ,
   id: string ,
   name: string ,
   type: string ,
   updatedAt: string ,
   userId: string ,
   value: {
       apikey: string
   } 
}

export type structuredNodes = {
     id: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
    type: string;
    metadata: Record<string, unknown>;
}
export type formdetailtype = {
  name :string , open : boolean , nodeid : string
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const  nodeTypes  = {
    "trigger": Trigger,
    "action" : Action
}

export const InitialNodes : Node [] = []
export const InitialEdges : Edge [] = []

export function WorkflowContent({workflowid}:{workflowid:string}){
    const [formDetail, setformDetail] = useState<formdetailtype>({name :"", open : false, nodeid:" "});

    const [refreshagain,setrefreshagain] = useState(false)
    const [saveloading,setsaveloading] = useState(false)
    const [nodes,setNodes,onNodesChange] = useNodesState(InitialNodes)
    const [edges,setEdges,onEdgesChange] = useEdgesState(InitialEdges)
    const [ sidebaropen , setsidebaropen ] = useState(false)
    
    const onConnect = useCallback((connection: Connection) => {
                 setEdges((prevEdges) => addEdge(connection, prevEdges));
        }, [setEdges]);
    
    const [ wholeworkflow , setwholeworkflow ] = useState<Workflow|null>()
    const  showToast = useToastSetterRemover()
    useEffect(() => {
        api
            .get<Workflow>(`${BACKEND_URL}/api/v1/workflow/${workflowid}`)
            .then((a) => {
                setwholeworkflow(a.data)
                const structuredNodes = a.data.nodes.map((n: WorkflowNode) => ({
                    id: n.id,
                    position: n.position,
                    type: n.type,
                    data: {
                    name: n.name,
                    metadata : n.data,
                    setformDetail,
                    },
                }));
                const structuredEdges = a.data.connections.map((c: Workflowconnection) => ({
                    source:c.fromNodeId,
                    target:c.toNodeId,
                    id: `xy-edge__${c.fromNodeId}-${c.toNodeId}`
                }));
                setNodes(structuredNodes);
                setEdges(structuredEdges)
            }).catch((err:unknown)=>{

                const error = err as AxiosError<{message:string}>;
                showToast({
                    message: error.response?.data?.message ?? "Failed to load workflow",
                    isError:true
                });

            });
    }, [workflowid,refreshagain]);

const Router = useRouter();
    return <div 
         className="h-160 w-full  relative">
            {/* {JSON.stringify(nodes)} */}
            {/* {JSON.stringify(formDetail)} */}
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

            <button onClick={()=>setsidebaropen(true)} className="absolute right-20 top-20 z-10  transition duration-100 ">
                <div className="h-8 rounded-sm  flex items-center bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040] w-8 justify-center">
                     <Add size="22"></Add>
                </div>
            </button>
            <button onClick={async()=>{
                try {
                    setsaveloading(true)
                    const response = await api.put(`${BACKEND_URL}/api/v1/workflow/${workflowid}`,{
                           nodes , edges
                    })
                    setsaveloading(false)

                    showToast({message :response.data.message,isError:false})
                    setrefreshagain((a)=>!a)
                } catch(err:unknown){
                    setsaveloading(false)
                    const error = err as AxiosError<{message:string}>
                    showToast({
                        message: error.response?.data?.message ?? "Failed to save workflow",
                        isError:true
                    })
                }

            }} className="absolute right-5 top-20 z-10 gap-0.5 ">
                <div className="h-8  w-14 rounded-sm px-2 active:scale-95 duration-100  flex items-center bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040] text-xs font-semibold justify-center">
                    {saveloading?
                    <div className=" w-full flex justify-center ">
                                                <div className=" h-4 w-4 rounded-full border-2 border-brand-border  border-t-brand-dark-bg dark:border-t-[#151619]  animate-spin" /> 
                    </div>
                    : <div className="flex items-center">
                      <div className="hidden lg:block">Save</div>
                      <Save size="14"></Save>
                    </div>}
                </div>
            </button>
            <ReactFlow
                    nodes={nodes} 
                    edges={edges} 
                    onNodesChange={onNodesChange} 
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    defaultViewport={{ x: 0, y: 0, zoom: 1.1 }}
                    >
                    
                    <Background/>
                    <Controls/>
            </ReactFlow>
            <DiscordForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} ></DiscordForm>
            <HttpForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} ></HttpForm>
            <ManualTriggerForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} ></ManualTriggerForm>
            <WebhookForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} ></WebhookForm>

            <AiForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} AiName="Gemini" AiType={"GEMINI"}></AiForm>
            {/* <AiForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} AiName="Anthropic" AiType={"CLAUDE"}></AiForm> */}
            {/* <NotionTriggerForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} ></NotionTriggerForm> */}
            {/* <GoogleFormTriggerForm nodes={nodes} setNodes={setNodes}  setformDetail={setformDetail} formDetail={formDetail} ></GoogleFormTriggerForm> */}
            {/* <GoogleSheetTriggerForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail} ></GoogleSheetTriggerForm> */}
            {/* <AiForm nodes={nodes} setNodes={setNodes} setformDetail={setformDetail} formDetail={formDetail}  AiName="OpenAi" AiType={"CHATGPT"}></AiForm> */}
    </div>
}

 
export const UseCred =()=>{
    const [creds, setcreds] = useState<Credential[]|null>([]);
    const showToast = useToastSetterRemover()
    
    useEffect(()=>{
       api.get(`${BACKEND_URL}/api/v1/credentials/all`).then(res => {
                setcreds(res.data.credential.sort((a:Credential,b:Credential)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
        }).catch((err:unknown)=>{
            const error = err as AxiosError<{message:string}>
            showToast({
                message: error.response?.data?.message ?? "Failed to load credentials",
                isError:true
            });

        });
    },[])
    return {
        creds
    }
}



