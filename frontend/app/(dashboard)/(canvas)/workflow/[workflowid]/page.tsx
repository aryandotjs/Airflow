import {  WorkflowContent } from "@/comp/ReactWorkflow"
import { ReactFlowProvider } from "@xyflow/react"




export default async function({params}:{params:Promise<{ workflowid: string }>}) {
     const { workflowid} = await params 
    return <div className=" h-screen  ">
         <ReactFlowProvider>
                <WorkflowContent workflowid={workflowid} ></WorkflowContent>
        </ReactFlowProvider>
    </div>
}