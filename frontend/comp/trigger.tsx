import { BuiltInNode, Edge, Handle, Node, NodeProps, Position, useReactFlow } from '@xyflow/react'
import React, { useState } from 'react'
import { Opneframe } from './openframe'
import { Secondarybutton } from './buttons/secondarybutton'
import { Namebox } from './buttons/namebox'
import { Adjust, Cross } from './svg/allsvg'
import { Addform } from './addform'
import { Input } from './buttons/input'

type TriggerNodeProp = NodeProps<BuiltInNode> & {
      data : {
        name :string ,
        metadata : string
      }
}
export default function Trigger({id,data:{name,metadata}}: TriggerNodeProp) {
  const {setNodes , setEdges} = useReactFlow();
  return (
    <div  className=''>
       <div className='p-3 border rounded-l-2xl rounded-r-sm  border-[#DCDFE2] dark:border-[#2C3034] bg-brand-bg hover:bg-[#E9E9E9] hover:dark:bg-[#212327] transition-colors dark:bg-[#151619]'>
           <img  src={`/actiontriggerimages/${name}.png`} className='h-8 dark:hidden'></img>
           <img  src={`/actiontriggerimages/dark${name}.png`} className='h-8 hidden dark:block'></img>
       </div>
       <Handle type="source" position={Position.Right}></Handle>
       <div className='absolute text-xs font-semibold '>
          <div className='m-1 ml-2'>
           {name}
          </div>
        </div>
       <div className='absolute top-[-25] left-2'>
          <div className='flex gap-1 justify-center'>
              <div className='hover:bg-[#E9E9E9] hover:dark:bg-[#212327] h-5 w-5 rounded-sm flex justify-center items-center cursor-default' onClick={()=>{
                 setNodes((prev:any )=>{
                    return prev.filter((a:any)=> a.id !== id )
                 })
                  setEdges((prev:any)=>{
                   return prev.filter((a:any)=> a.source !== id && a.target !== id)
                 }) 
              }}>
                 <Cross size='14'></Cross>
              </div>
              <div className='hover:bg-[#E9E9E9] hover:dark:bg-[#212327] h-5 w-5 rounded-sm flex justify-center items-center cursor-default' onClick={()=>{ }}>
                 <Adjust size='14'></Adjust>
              </div>
          </div>
       </div>
       
    </div>
  )
}
 


export  function Action({id,data:{name,metadata}}: TriggerNodeProp) {
  const {setNodes ,setEdges} = useReactFlow();
  return (
    <div  className=''>
          <div>
            
          </div>   
       <div className='p-3 border rounded-sm  border-[#DCDFE2] dark:border-[#2C3034] hover:dark:bg-[#212327] bg-brand-bg hover:bg-[#E9E9E9] transition-colors dark:bg-[#151619]'>
           <img src={`/actiontriggerimages/${name}.png`} className='h-8'></img>
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
                 setNodes((prev:any )=>{
                    return prev.filter((a:any)=> a.id !== id )
                 })
                 setEdges((prev:any)=>{
                   return prev.filter((a:any)=> a.source !== id && a.target !== id)
                 }) 
              }}>
                 <Cross size='14'></Cross>
              </div>
              <div className='hover:bg-[#E9E9E9] hover:dark:bg-[#212327] h-5 w-5 rounded-sm flex justify-center items-center cursor-default' onClick={()=>{ 
               }}>
                 <Adjust size='14'></Adjust>
              </div>
          </div>
       </div>
    </div>
  )
}