import { BuiltInNode,  Handle, NodeProps, Position, useReactFlow } from '@xyflow/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Adjust, Cross } from './svg/allsvg'
import { usePathname } from 'next/navigation'
import { AxiosError } from 'axios'
import { api } from '@/lib/api'
import { formdetailtype} from './ReactWorkflow'
import  useToastSetterRemover from './toastfunction'

type TriggerNodeProp = NodeProps<BuiltInNode> & {
      data : {
        name :string ,
        metadata : string
        setformDetail : Dispatch<SetStateAction<formdetailtype>>
      }
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export default function Trigger({id,data:{name,metadata,setformDetail}}: TriggerNodeProp) {
   const route = usePathname()
   const workflowid = route.split("/")[route.split("/").length-1]
  const {setNodes , setEdges} = useReactFlow();
  const [ loading , setloading] = useState(false)
   const showToast = useToastSetterRemover()
  
  return (
   <div>

    <div className='' onClick={name === "Trigger-manually" ? async()=>{
      try{
         setloading(true)
         await api.post(`${BACKEND_URL}/api/v1/workflow/test/${workflowid}`)
         setloading(false)
         showToast({
            message:"Workflow executed successfully",
            isError:false
        });
      }catch(err:unknown){
         const error = err as AxiosError<{message:string}>
         showToast({
            message: error.response?.data?.message ?? "Failed to execute workflow",
            isError:true
        });
         setloading(false)
      }
      } : ()=>{}}>
       <div className='relative p-3 border rounded-l-2xl rounded-r-sm  border-[#DCDFE2] dark:border-[#2C3034] bg-brand-bg hover:bg-[#E9E9E9] hover:dark:bg-[#212327] transition-colors dark:bg-[#151619]'>
           <img  src={`/actiontriggerimages/${name}.png`} className='h-8 dark:hidden'></img>
           <img  src={`/actiontriggerimages/dark${name}.png`} className='h-8 hidden dark:block'></img>
           {name === "Trigger-manually" && loading?
           <div className='absolute left-[-20] top-[20]'>
                  <div className="h-3 w-3 rounded-full border-2 border-brand-border  border-t-brand-dark-bg dark:border-t-[#151619]  animate-spin" />
           </div>:""}
       </div>
       
       <Handle type="source" position={Position.Right}></Handle>
       <div className='absolute text-xs font-semibold '>
          <div className='m-1 ml-2'>
           {name}
          </div>
        </div>
    </div>
       <div className='absolute top-[-25] left-2'>
          <div className='flex gap-1 justify-center '>
              <div className='hover:bg-[#E9E9E9] hover:dark:bg-[#212327] h-5 w-5 rounded-sm flex justify-center items-center cursor-default' onClick={()=>{
                 setNodes((prev)=>{
                    return prev.filter((a)=> a.id !== id )
                  })
                  setEdges((prev)=>{
                     return prev.filter((a)=> a.source !== id && a.target !== id)
                 }) 
                 
              }}>
                 <Cross size='14'></Cross>
              </div>
              <div  onClick={()=>{
                 setformDetail({name : name, open :true,nodeid:id})
               }}  className='hover:bg-[#E9E9E9] hover:dark:bg-[#212327] h-5 w-5 rounded-sm flex justify-center items-center cursor-default'>
                 <Adjust size='14'></Adjust>
              </div> 
          </div>
       </div>
   </div>
  )
}
 


export  function Action({id,data:{name,metadata,setformDetail}}: TriggerNodeProp) {
  const {setNodes ,setEdges} = useReactFlow();
  return (
    <div  className=''>
          <div>
            
          </div>   
       <div className='p-3 border rounded-sm  border-[#DCDFE2] dark:border-[#2C3034] hover:dark:bg-[#212327] bg-brand-bg hover:bg-[#E9E9E9] transition-colors dark:bg-[#151619]'>
           <img  src={`/actiontriggerimages/${name}.png`} className='h-8 dark:hidden'></img>
           <img  src={`/actiontriggerimages/dark${name}.png`} className='h-8 hidden dark:block'></img>
       </div>
       <Handle type="target" position={Position.Left}></Handle>
       <Handle type="source" position={Position.Right}></Handle>
       <div className='absolute text-xs font-semibold '>
          <div className='m-1 ml-2'>
           {name}
          </div>
        </div>
       <div className='absolute top-[-25] left-2'>
          <div className='flex gap-1 justify-center'>
              <div className='hover:bg-[#E9E9E9] hover:dark:bg-[#212327] h-5 w-5 rounded-sm flex justify-center items-center cursor-default' onClick={()=>{
                 setNodes((prev )=>{
                    return prev.filter((a)=> a.id !== id )
                 })
                 setEdges((prev)=>{
                   return prev.filter((a)=> a.source !== id && a.target !== id)
                 }) 
              }}>
                 <Cross size='14'></Cross>
              </div>
              <div onClick={()=>{
                   setformDetail({name : name, open :true,nodeid:id})
               }} className='hover:bg-[#E9E9E9] hover:dark:bg-[#212327] h-5 w-5 rounded-sm flex justify-center items-center cursor-default'>
                 <Adjust size='14'></Adjust>
              </div>
          </div>
       </div>
    </div>
  )
}