import { NodeProps, useReactFlow } from '@xyflow/react'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { Cross, Execution, Sphere, Webhook, WorkflowIcon } from './svg/allsvg'
import { MainButton } from './buttons/mainbutton'
import { nanoid } from 'nanoid'

   
               
const nodesuidata = [
   {
      position : { x : 280 , y: 350},
      type : "trigger",
      name : "google-forms",
      image : "/actiontriggerimages/google-forms.png",
      msg : " Runs the workflow when Google form is submitted"
   },
    {
      position : { x : 280 , y: 100},
      type : "trigger",
      name : "Notion",
      image : "/actiontriggerimages/notion.png",
      darkimage : "/actiontriggerimages/darknotion.png",
      msg : "Runs the workflow when notion row added"
   },
    {
      position : { x : 280 , y: 200},
      type : "trigger",
      name : "Google-sheet",
      image : "/actiontriggerimages/google-sheet.png",
      msg : "Runs the workflow when Google Sheets row added"
   },
   {
      position : { x : 480 , y: 180},
      type : "action",
      name : "HTTP-request",
      image : "/actiontriggerimages/HTTP-request.png",
      darkimage : "/actiontriggerimages/darkHTTP-request.png",
      msg : "make an api request"
   },
   {
      position : { x : 680 , y: 180},
      type : "action",
      name : "discord",
      image : "/actiontriggerimages/discord.png",
      msg : "Send a message to discord "
   },
   {
    position: { x: 580, y: 180 },
    type: "action",
    name: "gemini",
    image: "/actiontriggerimages/gemini.png",
    msg: "Uses Google Gemini to generate text"
  },
  {
    position: { x: 680, y: 280 },
    type: "action",
    name: "chatgpt",
    image: "/actiontriggerimages/chatgpt.png",
    msg: "Uses Chatgpt to generate text"
  },
  {
    position: { x: 580, y: 280 },
    type: "action",
    name: "claude",
    image: "/actiontriggerimages/claude.png",
    msg: "Uses Claude to generate text"
  },
   
]
 

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

             {nodesuidata.map((a:any,index)=>{
               return <div key={index}>
                        <div 
                              onClick={()=>{
                              setNodes((prev)=>{
                                 return [...prev,{
                                    id : nanoid() ,
                                    position : a.position,
                                    type : a.type,
                                    data : {
                                       name : a.name ,
                                       metadata : "",
                                       openForm: setformDetail
                                    }
                                 }]
                              })
                           }} 
                            className='py-6 flex gap-1 items-center hover:dark:bg-white/5 transition-colors duration-100 active:scale-99 hover:bg-black/3'>
                           <div className='flex w-15 justify-center'>
                              <img className='h-5 hidden dark:block' src={a.darkimage?a.darkimage:a.image}></img>
                              <img className='h-5 dark:hidden' src={a.image}></img>
                           </div>

                           <div> 
                              <div className='text-sm font-semibold dark:text-[#F0F0F0] dark:font-normal'> {a.name} </div>
                              <div className='text-xs text-[#949494]'> {a.msg}</div>
                           </div>
                     </div>
           
                     {index === 2 ?  <div className='border-b my-4 text-[#E9E9E9] dark:text-white/10'></div> : ""}
               </div>
             })}

             </div>

    </div>
    </div>
  )
}
