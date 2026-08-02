"use client"
import axios from "axios"
import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from "react"
import { Add, Adjust, Copy, Cross, Execution, Prev, Search } from "./svg/allsvg";
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

const timeobj : Record<string,number> = {
    "Today" : 24, 
    "Last 3 days":72,
    "Last 7 days":168,
    "Last 15 days":360
}

import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import "react18-json-view/src/dark.css";
import { CodeShow } from "./CodeShow";
import Spin from "./buttons/spinningwheel";
import { useRouter } from "next/navigation";
import { ExecutionTimeline } from "./ExecutionTimeline";

export  function Executions(){
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [zapruns,setzapruns] = useState()
    const [filter1,setfilter1] = useState("ALL")
    const [filter2,setfilter2] = useState("Last 15 days")
    const [search,setsearch] = useState("")
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/workflow/executions/all`,{
            // headers : {
            //     "authorization" : `Bearer ${localStorage.getItem("token")}`
            // }
        }).then((a)=>{
            setzapruns(a.data.sort((a:any,b:any)=> new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()))
        })
    },[])


     const filteredZapruns : any = useMemo(()=>{

              return (zapruns ?? [] ).filter((a:any)=>{
                const hoursAgo = (Date.now() - new Date(a.startedAt).getTime()) 
                    / (1000 * 60 * 60);
                const MatchFilter1 = filter1 == "ALL" || a.status === filter1 
                const MatchFilter2 = filter2 == "ALL" || hoursAgo <= timeobj[filter2]
                const MatchSearch = a.workflow.name.toLowerCase().includes(search.toLowerCase())
                return  MatchFilter1   && MatchFilter2 && MatchSearch 
               }) 

         },[zapruns,search,filter1,filter2])

    return  <div className="flex flex-col gap-4 px-24  h-screen ">
                <div className="flex justify-between mt-6 items-center ">
                    <div className=" text-[28px] tracking-tight  font-semibold    dark:text-brand-bg text-brand-dark-bg">Executions</div>
                </div>
                <div className="flex justify-between mt-5 items-center gap-2">
                    <div className="h-8 w-[50%]">
                        <Secondarybutton onclick={()=>{}}>
                            <div className="flex h-full items-center gap-2 w-full">
                                <Search size="16"></Search>
                                <input onChange={(a)=> setsearch(a.target.value)} className=" outline-0 flex-2" placeholder="Search..." value={search}></input>
                            </div>
                        </Secondarybutton>
                    </div>
                    <div className="w-[25%]">
                         <OpenerBoxWithOptions options={[ "ALL","PENDING","RUNNING","SUCCESS","FAILED"]} simplefilter={filter1} setsimplefilter={setfilter1} ></OpenerBoxWithOptions> 
                    </div>
                    <div className="w-[25%]">
                         <OpenerBoxWithOptions options={["Today","Last 3 days","Last 7 days","Last 15 days","ALL"]} simplefilter={filter2} setsimplefilter={setfilter2} ></OpenerBoxWithOptions> 
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
                            <div className="w-[20%] "></div>
                            <div className="w-[20%]  text-start ml-5">Name</div>
                            <div className="w-[15%] text-center">Status</div>
                            <div className="w-[25%] text-center">Duration</div>
                            <div className="w-[15%] flex flex-row-reverse ">Started</div>
                        </div>
                    </Secondarybutton>
                    
                    {zapruns ? 
                          <History filteredZapruns={filteredZapruns}></History>
                          :
                          <div className="bg-brand-bg dark:bg-brand-dark-bg h-screen w-full flex justify-center mt-40">
                                <Spin></Spin>
                          </div>
                    }
                </div>
                    
         </div>
}
 

function History({filteredZapruns} :any){
    const [selectedcard , setselectedcard] = useState({open:false,index:null})
    const router = useRouter()
    if (!filteredZapruns) {
        return <div>loading</div>
    }
    if (!filteredZapruns.length) {
        return <div className="h-90 flex flex-col items-center justify-center">
        <div className="text-sm font-medium dark:text-[#F0F0F0] text-[#191919]">
            No executions yet
        </div>

        <div className="mt-1 text-xs dark:text-[#9C9FA0] text-[#666666]">
            Run a workflow to see your execution history here.
        </div>
    </div>
    }
     return <div className="px-2 pr-4 ">
        {filteredZapruns.map((z:any,index:any)=>{
            return <div key={index} className={`${z.status === "RUNNING" ? "pointer-events-none":""} flex w-full items-center justify-between border-b  border-[#EEEEEE]  dark:border-[#191B1E] cursor-pointer dark:text-[#9C9FA0] text-[#404040]   tracking-normal text-xs font-semibold `}>
                <div className="flex w-full h-8 my-3 gap-5 justify-between">
                    <div className="  flex items-center gap-1 w-[20%]">
                        <Svgframe status={z.status.toLowerCase()}>
                            <Execution size={"18"} ></Execution>
                        </Svgframe>
                        {/* <div> {'->'} </div>
                        {z.type.actions.map((a:any,b:any)=>{
                            return <div key={b}>
                                <Svgframe status={z.status.toLowerCase()}>
                                     <SvgforActionsTriggers size="20" name={a.type.name}>
                                    </SvgforActionsTriggers>
                                </Svgframe>
                            </div>
                        })} */}
                    </div>
                    
                    <div  onClick={()=>{ 
                          router.push(`/executions/${z.id}`)
                        }} className="w-[20%] dark:text-[#F0F0F0] text-[#191919] text-xs flex items-center gap-3 underline decoration-dashed decoration-[#EEEEEE] dark:decoration-[#191B1E] hover:decoration-blue-400 dark:hover:decoration-[#EEEEEE]  underline-offset-6 transition-all duration-400  font-normal dark:font-medium ">
                      {z.workflow.name}
                    </div>
                    
                    <div className="w-[15%]  flex items-center justify-center ">
                        <StatusButton status={z.status.toLowerCase()}></StatusButton>
                    </div>
                    <div className="w-[25%]  flex items-center justify-center">

                            <div>{DurationCalculator(z.startedAt,z.completedAt)}</div>
                        {/* <div className="flex bg-[#E9E9E9] h-5 dark:bg-[#151619] text-xs px-2 rounded-lg py-0.5 w-full overflow-hidden ">{z.id}</div> */}
                    </div>
                    <div className="w-[15%]  flex items-center justify-end text-xs font-normal dark:font-medium dark:text-[#F0F0F0] text-[#191919]">
                         <DateConverter isoString={z.startedAt}></DateConverter>
                    </div>
                </div>
                  
         </div>
        })}
         
     </div>
}


export function DetailCard({id} : any){
    const [execution , setexecution] = useState<any>(null)
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/workflow/executions/all`,{
            // headers : {
            //     "authorization" : `Bearer ${localStorage.getItem("token")}`
            // }
        }).then((a)=>{

            let filtered = a.data.find((e:any)=>e.id === id)
            setexecution(filtered)
        })
    },[])
    
    const router = useRouter()
   
    if (!execution) {
        return <div></div>
    }
    return <div className="h-screen ">
        <div className={` bg-brand-bg dark:bg-brand-dark-bg px-24 pb-50`}>
            <div className={` mt-8 z-50`}> 
                <div className="flex text-l font-medium items-center justify-between ">
                    <div className=" gap-6 flex">
                        <Svgframe status={execution.status.toLowerCase()} big={true}> 
                            <Execution size={"40"} ></Execution>
                        </Svgframe>
                        <div className=" flex flex-col justify-center">
                            <div>Execution</div>
                            <div className="dark:text-[#F0F0F0] text-[#191919] text-xl font-semibold">{execution.workflow.name}</div>
                        </div>
                    </div>
                    <div onClick={()=>router.push("/executions")} className="h-8 flex items-center ease-in-out active:scale-80 transition-transform">
                            <Secondarybutton small={true}>
                            <Prev size="20"></Prev>
                            </Secondarybutton>
                    </div>
                </div>
                <div className="flex my-6 w-full">
                    
                    <div className="w-[33%] flex flex-col gap-1">
                        <div className="text-[13px] font-normal ">Duration</div>
                        <div className="dark:text-[#F0F0F0] text-[#191919]">{DurationCalculator(execution.startedAt,execution.completedAt)}</div>
                    </div>
                    <div className="w-[33%] flex flex-col gap-1">
                        <div className="text-[13px] font-normal ">Status</div>
                        <div className="w-14"><StatusButton status={execution.status.toLowerCase()}></StatusButton></div>
                    </div>
                </div>
                <div className="flex my-6 w-full">
                    <div className="w-[33%] flex flex-col gap-1">
                        <div className="text-[13px] font-normal ">Start Date</div>
                        <div className="dark:text-[#F0F0F0] text-[#191919]">
                            <DateConverter isoString={execution.startedAt}></DateConverter>
                        </div>
                    </div>
                    <div className="w-[33%] flex flex-col gap-1">
                        <div className="text-[13px] font-normal ">End Date</div>
                        <div className="dark:text-[#F0F0F0] text-[#191919]">
                            <DateConverter isoString={execution.completedAt}></DateConverter>
                        </div>
                    </div>
                    <div className="w-[33%] flex flex-col gap-1">
                        <div className="text-[13px] font-normal ">WorkFlow Id</div>
                        <div className="">
                            <div className="w-full h-full text-[14px] flex justify-between items-center rounded-lg font-semibold  px-2 bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040]">
                                <div className="my-0.5">{execution.id}</div>
                                <div onClick={()=>{navigator.clipboard.writeText(execution.id)}} className=" transition-all active:scale-80 duration-150 hover:bg-[#C6C6C6] dark:hover:bg-[#2C3034] rounded-md p-0.5">
                                    <Copy size="19"></Copy>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ExecutionTimeline  steps={execution.output.steps?execution.output.steps:[]} ></ExecutionTimeline>
                <div className="mt-8">
                {execution.error ? 
                <CodeShow header="Workflow Error" code={ execution.error? execution.error:{}} error={true} ></CodeShow>:""}
                <CodeShow header="Workflow Output" code={execution.output?execution.output:{}} error={false} ></CodeShow>
                </div>
            </div>
        </div>
    </div>

}


function DurationCalculator(start:string,end:string):string{
       const a = Date.parse(start)
       const b = Date.parse(end)
       const c =  (Number(b)- Number(a)).toString()

       if (Number(c) >= 1000) {
           return (Number(c)/1000).toString()+ "sec"
       }
    return c + "ms"
}

export function Svgframe({children,status , big = false}: {children:ReactNode,status:string, big? : boolean}){
    return <div className={`h-8 w-8 flex items-center justify-center  border border-[#D6D6D6] dark:border-[#D2D6D5] ${big?  "h-20 w-20 rounded-3xl  border-3 dark:border-2" : "rounded-lg"} `}>
        <div className={`bg-radial  border-brand-bg dark:border-brand-dark-bg h-full w-full flex items-center justify-center ${big?  "rounded-3xl border-3 dark:border-4" : " rounded-lg border-2 "} 
            ${
            status === "success" ? "bg-radial from-[#E4F4E9] to-[#E4F4E9] dark:from-[#3BD88C] dark:to-[#041E12] text-[#357557] dark:text-[#D2D6D5]" : 
            status === "active" ? "bg-radial from-[#E4F4E9] to-[#E4F4E9] dark:from-[#3BD88C] dark:to-[#041E12] text-[#357557] dark:text-[#D2D6D5]" : 
            status === "failed" ?  "bg-radial from-[#FCE9EA] to-[#FCE9EA] dark:from-[#9F4345] dark:to-[#2D040B] text-[#9E4245] dark:text-[#D2D6D5]"  :
            status === "running" ?  "bg-radial from-[#E4F2FC] to-[#E4F2FC] dark:from-[#0C74CE] dark:to-[#001B3A] text-[#0C74CE] dark:text-[#D2D6D5]"  :
            status === "paused" ?  "bg-radial from-[#E4F2FC] to-[#E4F2FC] dark:from-[#0C74CE] dark:to-[#001B3A] text-[#0C74CE] dark:text-[#D2D6D5]"  :
            status === "disabled" ?  "bg-linear from-[#EEEEEE] to-[#EEEEEE] dark:from-[#414141] dark:to-[#191B1E] " :
            status === "pending" ?  "bg-linear from-[#EEEEEE] to-[#EEEEEE] dark:from-[#414141] dark:to-[#191B1E] ":
            status === "draft" ?  "bg-linear from-[#EEEEEE] to-[#EEEEEE] dark:from-[#414141] dark:to-[#191B1E] "  :""
         }`}>
          {children}
        </div>
    </div>
}
