import { Workflows } from "@/comp/workflows"




export default async function({params}:{params:Promise<{ workflowid: string }>}) { 
     const { workflowid} = await params 
    return <div className="flex h-screen"> 
          <Workflows></Workflows> 
    </div> 
} 


