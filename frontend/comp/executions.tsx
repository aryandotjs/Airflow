"use client"
import { Appbar } from "@/comp/Appbar";
import axios from "axios"
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { Add, Adjust, Copy, Cross, Prev, Search } from "./svg/allsvg";
import { Secondarybutton } from "./buttons/secondarybutton";
import { OpenComp } from "./opencomp";
import { OpenerButton } from "./buttons/openerButton";
import { OpenOptions } from "./openoptions";
import { OpenerBoxWithOptions } from "./OpenerBoxWithOptions";
import { StatusButton } from "./buttons/statusbutton";
import { DateConverter } from "./RunTimeBadge";
import { SvgforActionsTriggers } from "./SvgforActionsTriggers";
import { Opneframe } from "./openframe";

const BACKEND_URL = "http://localhost:3001";
 interface Zap {
  id : String ,
  userId : number,
  trigger : {
    id        : String,
    triggerId :  String,
    zapId     : String,           
    metadata  : Record<string,any>,
    type : {
      id: string;
      name: string; 
      image: string;
    }       
  },
  actions : {
    id           : string,         
    metadata     : string,           
    sortingOrder : string,            
    zapId     : string,
    ActionId  : string,
    type : {
      id: string;
      name: string; 
      image: string;
    }
  }[]
}

import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import "react18-json-view/src/dark.css";
import { CodeShow } from "./CodeShow";

export  function Executions(){
    const [zapruns,setzapruns] = useState()
    const [filter1,setfilter1] = useState("pending")
    const [filter2,setfilter2] = useState("")
    const [filter3,setfilter3] = useState("")
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/zap/all`,{
            // headers : {
            //     "authorization" : `Bearer ${localStorage.getItem("token")}`
            // }
        }).then((a)=>{
            console.log(a.data.zaps[0])
               setzapruns(a.data.zaps)
        })
    },[])
    
    return  <div className="flex flex-col gap-4 px-24 ">
                <div className="flex justify-between mt-6 items-center ">
                    <div className=" text-[28px] tracking-tight  font-semibold    dark:text-brand-bg text-brand-dark-bg">Executions</div>
                </div>
                <div className="flex justify-between mt-5 items-center gap-2">
                    <div className="h-8 w-[40%]">
                        <Secondarybutton onclick={()=>{}}>
                            <div className="flex h-full items-center gap-2 w-full">
                                <Search size="16"></Search>
                                <input className=" outline-0 flex-2" placeholder="Search..."></input>
                            </div>
                        </Secondarybutton>
                    </div>
                    <div className="w-[20%]">
                         <OpenerBoxWithOptions options={["success","failed","pending"]} simplefilter={filter1} setsimplefilter={setfilter1} ></OpenerBoxWithOptions> 
                    </div>
                    <div className="w-[20%]">
                         <OpenerBoxWithOptions options={["success","failed","pending"]} simplefilter={filter1} setsimplefilter={setfilter1} ></OpenerBoxWithOptions> 
                    </div>
                    <div className="w-[20%]">
                         <OpenerBoxWithOptions options={["success","failed","pending"]} simplefilter={filter1} setsimplefilter={setfilter1} ></OpenerBoxWithOptions> 
                    </div>
                    <div className="h-8">
                         <Secondarybutton small={true}>
                            <Adjust size="20"></Adjust>
                         </Secondarybutton>
                    </div>
                </div>
                <div className=" h-8 ">
                    <Secondarybutton onclick={()=>{}} >
                        <div className="flex justify-between w-full text-xs p-3">
                            <div className="w-[25%] "></div>
                            <div className="w-[20%]  text-start">Name</div>
                            <div className="w-[15%] text-start">Status</div>
                            <div className="w-[25%]">Id</div>
                            <div className="w-[15%] flex flex-row-reverse ">Created</div>
                        </div>
                    </Secondarybutton>
                    <div className="">
                        {zapruns ? <History zapruns={zapruns}></History> : "Loading...." }
                    </div>
                </div>
                    
         </div>
}

function History({zapruns} :any){
    const [iscardOpen , setiscardOpen] = useState(false)
    const [cardIndex , setcardIndex] = useState(0)

     return <div className="px-2 pr-4 ">
        {iscardOpen ? 
        <div className="z-20 absolute top-0 left-0 h-158.5 w-full bg-brand-bg dark:bg-brand-dark-bg px-24 overflow-y-scroll">
            {cardIndex}
         <DetailCard setiscardOpen={setiscardOpen} azaprun={zapruns[cardIndex]}></DetailCard>
        </div> : ""}
{cardIndex}
        {zapruns.map((z:any,index:any)=>{
            return <div key={index} className=" flex w-full items-center justify-between border-b  border-[#EEEEEE]  dark:border-[#191B1E] cursor-pointer dark:text-[#9C9FA0] text-[#404040]   tracking-normal text-xs font-semibold ">
                <div className="flex w-full h-8 my-3 gap-5 justify-between">
                    <div className="  flex items-center gap-1 w-[25%]">
                        <Svgframe status="Success">
                            <SvgforActionsTriggers size="18" name={z.type.trigger.type.name}></SvgforActionsTriggers>
                        </Svgframe>
                        <div> {'->'} </div>
                        {z.type.actions.map((a:any,b:any)=>{
                            return <div key={b}>
                                <Svgframe status={"Success"}>
                                     <SvgforActionsTriggers size="20" name={a.type.name}>
                                    </SvgforActionsTriggers>
                                </Svgframe>
                            </div>
                        })}
                    </div>
                    
                    <div  onClick={()=>{ 
                        setiscardOpen(!iscardOpen)
                        setcardIndex(index)
                        }} className="w-[20%] dark:text-[#F0F0F0] text-[#191919] text-xs flex items-center gap-3 underline decoration-dashed decoration-[#EEEEEE] dark:decoration-[#191B1E] hover:decoration-blue-400 dark:hover:decoration-[#EEEEEE]  underline-offset-6 transition-all duration-400  font-normal dark:font-medium ">
                      Untititled Workflow
                    </div>
                    <div className="w-[15%]  flex items-center ">
                        <StatusButton status={"Success"}></StatusButton>
                    </div>
                    <div className="w-[25%]  flex items-center ">
                        <div className="bg-[#E9E9E9]  dark:bg-[#151619] text-xs px-2 rounded-lg py-0.5">{z.id}</div>
                    </div>
                    <div className="w-[15%]  flex items-center justify-end text-xs font-normal dark:font-medium dark:text-[#F0F0F0] text-[#191919]">
                         <DateConverter isoString={"1783223001331"}></DateConverter>
                    </div>
                </div>
                
         </div>
        })}
         
     </div>
}


function DetailCard({azaprun,setiscardOpen} : any){
    return <div className="mt-8 z-50"> 
        <div className="flex text-l font-medium items-center justify-between ">
            <div className=" gap-6 flex">
                <Svgframe status={"Success"} big={true}>
                    <SvgforActionsTriggers size="40" name={"Email"}>
                    </SvgforActionsTriggers>
                </Svgframe>
                <div className=" flex flex-col justify-center">
                    <div>Execution</div>
                    <div className="dark:text-[#F0F0F0] text-[#191919] text-xl font-semibold">{azaprun}</div>
                </div>
            </div>
            <div onClick={()=>{setiscardOpen(false)}} className="h-8 flex items-center ease-in-out active:scale-80 transition-transform">
                    <Secondarybutton small={true}>
                    <Prev size="20"></Prev>
                    </Secondarybutton>
            </div>
        </div>
        <div className="flex my-6 w-full">
            <div className="w-[33%] flex flex-col gap-1">
                <div className="text-[13px] font-normal ">Execution Name</div>
                <div className="dark:text-[#F0F0F0] text-[#191919]">sdsdddc</div>
            </div>
            <div className="w-[33%] flex flex-col gap-1">
                <div className="text-[13px] font-normal ">Duration</div>
                <div className="dark:text-[#F0F0F0] text-[#191919]">sdsdddc</div>
            </div>
            <div className="w-[33%] flex flex-col gap-1">
                <div className="text-[13px] font-normal ">Status</div>
                <div className="w-14"><StatusButton status="Success"></StatusButton></div>
            </div>
        </div>
        <div className="flex my-6 w-full">
            <div className="w-[33%] flex flex-col gap-1">
                <div className="text-[13px] font-normal ">Start Date</div>
                <div className="dark:text-[#F0F0F0] text-[#191919]">sdsdddc</div>
            </div>
            <div className="w-[33%] flex flex-col gap-1">
                <div className="text-[13px] font-normal ">End Date</div>
                <div className="dark:text-[#F0F0F0] text-[#191919]">sdsdddc</div>
            </div>
            <div className="w-[33%] flex flex-col gap-1">
                <div className="text-[13px] font-normal ">WorkFlow Id</div>
                <div className="">
                    <div className="w-full h-full text-[14px] flex justify-between items-center rounded-lg font-semibold  px-2 bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040]">
                        <div className="my-0.5">sdsdvsdvs-12cdc-3f</div>
                        <div className=" transition-all active:scale-80 duration-150 hover:bg-[#C6C6C6] dark:hover:bg-[#2C3034] rounded-md p-0.5">
                            <Copy size="19"></Copy>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-8">
        <CodeShow header="Response Body" code={b}></CodeShow>
        </div>

        <div className="my-8">
        <CodeShow header="Response Body" code={j}></CodeShow>
        </div>
    </div>
}
const j = {
  "cc": [],
  "to": [
    "aryanloharchawand@gmail.com"
  ],
  "bcc": [],
  "from": "Airflow <onboarding@resend.dev>",
  "html": null,
  "text": "hey mate karan you have won this monolith - hackathon  worth 1000 so kindly fill details on this platform https://:formlink/crate/fill/user/new/:id}",
  "replyTo": [],
  "subject": "Automation zap triggered!"
}
const b = {
  "id": "1bbcc79e-d834-4a4c-8c8f-71a8c68aa748"
}

export function Svgframe({children,status , big = false}: {children:ReactNode,status:string, big? : boolean}){
    return <div className={`h-8 w-8 flex items-center justify-center  border border-[#D6D6D6] dark:border-[#D2D6D5] ${big?  "h-20 w-20 rounded-3xl  border-3 dark:border-2" : "rounded-lg"} `}>
        <div className={`bg-radial  border-brand-bg dark:border-brand-dark-bg h-full w-full flex items-center justify-center ${big?  "rounded-3xl border-3 dark:border-4" : " rounded-lg border-2 "} 
            ${
            status === "Success" ? "bg-radial from-[#E4F4E9] to-[#E4F4E9] dark:from-[#3BD88C] dark:to-[#041E12] text-[#357557] dark:text-[#D2D6D5]" : 
            status === "active" ? "bg-radial from-[#E4F4E9] to-[#E4F4E9] dark:from-[#3BD88C] dark:to-[#041E12] text-[#357557] dark:text-[#D2D6D5]" : 
            status === "Failed" ?  "bg-radial from-[#FCE9EA] to-[#FCE9EA] dark:from-[#9F4345] dark:to-[#2D040B] text-[#9E4245] dark:text-[#D2D6D5]"  :
            status === "Runing" ?  "bg-radial from-[#E4F2FC] to-[#E4F2FC] dark:from-[#0C74CE] dark:to-[#001B3A] text-[#0C74CE] dark:text-[#D2D6D5]"  :
            status === "paused" ?  "bg-radial from-[#E4F2FC] to-[#E4F2FC] dark:from-[#0C74CE] dark:to-[#001B3A] text-[#0C74CE] dark:text-[#D2D6D5]"  :
            status === "Disabled" ?  "bg-linear from-[#EEEEEE] to-[#EEEEEE] dark:from-[#414141] dark:to-[#191B1E] " :
            status === "draft" ?  "bg-linear from-[#EEEEEE] to-[#EEEEEE] dark:from-[#414141] dark:to-[#191B1E] "  :""
         }`}>
          {children}
        </div>
    </div>
}
