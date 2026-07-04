import { metadata } from "@/app/layout";
import { ReactFlow , Node, Background, Controls, Edge, useNodesState, useEdgesState, Connection, addEdge, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import RightsideBar from "./rightsidebar";
import Trigger, { Action } from "./trigger";
import { Add } from "./svg/allsvg";
import { MainButton } from "./buttons/mainbutton";
import { Secondarybutton } from "./buttons/secondarybutton";

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
    return <div 
         className="h-160 w-322 ">
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
    </div>
}

export function ReactWorkflow(){
   return <ReactFlowProvider>
       <WorkflowContent/>
   </ReactFlowProvider>
}

