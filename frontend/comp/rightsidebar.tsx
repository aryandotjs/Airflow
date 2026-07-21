import { NodeProps, useReactFlow } from '@xyflow/react'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { Cross, Execution, Sphere, Webhook, WorkflowIcon } from './svg/allsvg'
import { MainButton } from './buttons/mainbutton'
import { nanoid } from 'nanoid'

export default function RightsideBar({sidebaropen ,setsidebaropen,setformDetail }:{sidebaropen:boolean , setsidebaropen : Dispatch<SetStateAction<boolean>>,setformDetail: Dispatch<SetStateAction<any>>}) {
  const modalref = useRef<HTMLDivElement>(null)
  const  { getNodes , setNodes } = useReactFlow()

  useEffect(()=>{
     function handleClickOutside(event : MouseEvent){
        if (modalref.current && !modalref.current.contains(event.target as Node)) {
           setsidebaropen(false)
        }
     }

     document.addEventListener("mousedown",handleClickOutside)

     return ()=>{
         document.removeEventListener("mousedown",handleClickOutside)
     }
  },[])
  return (
    <div className={`fixed top-0 left-0 bg-black/50 dark:bg-white/10 z-50 h-full w-full transition-opacity duration-300 ${sidebaropen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
    <div ref={modalref} className={`fixed top-0 right-0 h-full w-110  bg-brand-bg dark:bg-brand-dark-bg  z-50 overflow-y-scroll
      transition-transform duration-300 ease-in-out 
      ${sidebaropen ? "translate-x-0" : "translate-x-full"}`} >
         <div className='w-full p-3 flex justify-between items-center'>
            <div className='flex gap-2'>
               <div className=' flex items-center px-2'>
                    <Webhook size='20'></Webhook>
               </div>
               <div>
                   <div className="text-[17px] tracking-tight  font-semibold  dark:text-[#F0F0F0] ">Add a step </div>
                   <div className="text-[14px] tracking-tight text-[#949494] leading-2.5  font-normal  ">trigger & actions</div>
               </div>
            </div>
            <div onClick={()=>setsidebaropen(false)} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
         </div>

            <div className='border-b text-[#E9E9E9] dark:text-white/10'></div>
         

            <div className='py-4'>
               <div 
                  onClick={()=>{
                  setNodes((prev)=>{
                     return [...prev,{
                        id : nanoid() ,
                        position : { x : 280 , y: 280},
                        type : "trigger",
                        data : {
                           name : "Google-sheet" ,
                           metadata : "",
                           openForm: setformDetail
                        }
                     }]
                  })
               }} 
               className='py-6 flex gap-1 items-center hover:dark:bg-white/5 transition-colors duration-100 active:scale-99 hover:bg-black/3'>
                  <div className='flex w-15 justify-center'>
                     <img className='h-5 ' src="/actiontriggerimages/google-sheet.png"></img>
                  </div>

                  <div> 
                     <div className='text-sm font-semibold dark:text-[#F0F0F0] dark:font-normal'> Google sheet </div>
                     <div className='text-xs text-[#949494]'> Runs the workflow when Google Sheets row added</div>
                  </div>
               </div>

               <div 
                  onClick={()=>{
                  setNodes((prev)=>{
                     return [...prev,{
                        id : nanoid() ,
                        position : { x : 280 , y: 280},
                        type : "trigger",
                        data : {
                           name : "Notion" ,
                           metadata : "",
                           openForm: setformDetail
                        }
                     }]
                  })
               }} 
              className='py-6 flex gap-1 items-center hover:dark:bg-white/5 transition-colors duration-100 active:scale-99 hover:bg-black/3'>
                  <div className='flex w-15 justify-center'>
                     <img className='h-5  hidden dark:block' src="/actiontriggerimages/darknotion.png"></img>
                     <img className='h-5  dark:hidden' src="/actiontriggerimages/notion.png"></img>
                  </div>
                  <div> 
                     <div className='text-sm font-semibold dark:text-[#F0F0F0] dark:font-normal'>Notion  </div>
                     <div className='text-xs text-[#949494] '>Runs the workflow when a page or item is added to a database </div>
                  </div>
               </div>


               {/* <div 
                  onClick={()=>{
                     setNodes((prev)=>{
                        return [...prev,{
                           id : nanoid() ,
                           position : { x : 280 , y: 280},
                           type : "trigger",
                           data : {
                              name : "webhook" ,
                              metadata : "",
                              openForm: setformDetail
                           }
                        }]
                     })
                  }}   className='py-6 flex gap-1 items-center hover:dark:bg-white/5 transition-colors duration-100 active:scale-99 hover:bg-black/3'>
                  <div className='flex w-15 justify-center'>
                     <img className='h-6  hidden dark:block' src="/actiontriggerimages/darkwebhook.png"></img>
                     <img className='h-6  dark:hidden' src="/actiontriggerimages/webhook.png"></img>
                  </div>
                  <div> 
                     <div  className='text-sm font-semibold dark:text-[#F0F0F0] dark:font-normal'> Webhook </div>
                     <div className='text-xs text-[#949494]'> Runs the workflow instantly when data is sent to a unique URL </div>
                  </div>
               </div> */}

               <div className='py-4'>
               <div 
                  onClick={()=>{
                  setNodes((prev)=>{
                     return [...prev,{
                        id : nanoid() ,
                        position : { x : 280 , y: 280},
                        type : "trigger",
                        data : {
                           name : "google-forms" ,
                           metadata : "",
                           openForm: setformDetail
                        }
                     }]
                  })
               }} 
               className='py-6 flex gap-1 items-center hover:dark:bg-white/5 transition-colors duration-100 active:scale-99 hover:bg-black/3'>
                  <div className='flex w-15 justify-center'>
                     <img className='h-5 ' src="/actiontriggerimages/google-forms.png"></img>
                  </div>

                  <div> 
                     <div className='text-sm font-semibold dark:text-[#F0F0F0] dark:font-normal'> Google Form </div>
                     <div className='text-xs text-[#949494]'> Runs the workflow when Google form is submitted</div>
                  </div>
               </div>

            </div>
            
            <div className='border-b text-[#E9E9E9] dark:text-white/10'></div>

            <div className='pt-4'>
               

               <div 
                  onClick={()=>{
                  setNodes((prev)=>{
                     return [...prev,{
                        id : nanoid() ,
                        position : { x : 680 , y: 280},
                        type : "action",
                        data : {
                           name : "discord" ,
                           metadata : "",
                           openForm: setformDetail
                        }
                     }]
                  })
               }} className='py-6 flex gap-1 items-center hover:dark:bg-white/5 transition-colors duration-100 active:scale-99  hover:bg-black/3'>
                  <div className='flex w-15 justify-center'>
                     <img className='h-6' src="/actiontriggerimages/discord.png"></img>
                  </div>
                  <div> 
                     <div  className='text-sm font-semibold dark:text-[#F0F0F0] dark:font-normal'> Discord </div>
                     <div className='text-xs text-[#949494]'> Send a message to discord </div>
                  </div>
               </div>
               
               <div 
                  onClick={()=>{
                  setNodes((prev)=>{
                     return [...prev,{
                        id : nanoid() ,
                        position : { x : 680 , y: 280},
                        type : "action",
                        data : {
                           name : "gemini" ,
                           metadata : "",
                           openForm: setformDetail
                        }
                     }]
                  })
               }} className='py-6 flex gap-1 items-center hover:dark:bg-white/5 transition-colors duration-100 active:scale-99  hover:bg-black/3'>
                   <div className='flex w-15 justify-center'>
                     <img className='h-6' src="/actiontriggerimages/gemini.png"></img>
                  </div>
                  <div> 
                     <div  className='text-sm font-semibold dark:text-[#F0F0F0] dark:font-normal'> Gemini </div>
                     <div className='text-xs text-[#949494]'>Uses Google Gemini to generate text </div>
                  </div>
               </div>

               <div 
                  onClick={()=>{
                  setNodes((prev)=>{
                     return [...prev,{
                        id : nanoid() ,
                        position : { x : 680 , y: 280},
                        type : "action",
                        data : {
                           name : "chatgpt" ,
                           metadata : "",
                           openForm: setformDetail
                        }
                     }]
                  })
               }}   className='py-6 flex gap-1 items-center hover:dark:bg-white/5 transition-colors duration-100 active:scale-99  hover:bg-black/3'>
                  <div className='flex w-15 justify-center'>
                     <img className='h-6' src="/actiontriggerimages/chatgpt.png"></img>
                  </div>
                  <div> 
                     <div  className='text-sm font-semibold dark:text-[#F0F0F0] dark:font-normal'>  Chatgpt </div>
                     <div className='text-xs text-[#949494]'> Uses  Chatgpt to generate text </div>
                  </div>
               </div>

               <div 
                  onClick={()=>{
                  setNodes((prev)=>{
                     return [...prev,{
                        id : nanoid() ,
                        position : { x : 680 , y: 280},
                        type : "action",
                        data : {
                           name : "claude" ,
                           metadata : "",
                           openForm: setformDetail
                        }
                     }]
                  })
               }}  className='py-6 flex gap-1 items-center hover:dark:bg-white/5 transition-colors duration-100 active:scale-99  hover:bg-black/3'>
                  <div className='flex w-15 justify-center'>
                     <img className='h-6' src="/actiontriggerimages/claude.png"></img>
                  </div>
                  <div> 
                     <div  className='text-sm font-semibold dark:font-normal dark:text-[#F0F0F0]'>  Claude</div>
                     <div className='text-xs text-[#949494]'> Uses  Claude to generate text </div>
                  </div>
               </div>
               
            </div>
            
    </div>
    </div>
    </div>
  )
}
