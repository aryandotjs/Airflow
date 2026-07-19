"use client"
import { DarkButton } from "@/comp/buttons/darkbutton";
import { MainButton, MainRedButton } from "@/comp/buttons/mainbutton";
import { Namebox } from "@/comp/buttons/namebox";
import { Secondarybutton } from "@/comp/buttons/secondarybutton";
import { DiscordConfigPanel } from "@/comp/discord";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Add, Adjust, Bin, Check, Duplicate, Edit, Pause, Play, Search } from "./svg/allsvg";
import { OpenerBoxWithOptions } from "./OpenerBoxWithOptions";
import { Svgframe } from "./executions";
import { SvgforActionsTriggers } from "./SvgforActionsTriggers";
import { DateConverter} from "./RunTimeBadge";
import { StatusButton } from "./buttons/statusbutton";
import { Opneframe } from "./openframe";
import { Toast } from "./toast";
import { Addform } from "./addform";
import { Input } from "./buttons/input";
import { error } from "console";
import toastsetterremover from "./toastfunction";
import Spin from "./buttons/spinningwheel";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
enum ZapStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED" ,
  DRAFT = "DRAFT"
}

interface Zap {
  id : String ,
  userId : number,
  name : string,
  createdAt : string,
  runs : number,
  status : ZapStatus
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



function useWorkflow(refresh:boolean) {
    const [loading, setLoading] = useState(true);
    const [workflows, setworkflows] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/workflow/all`, {
            // headers: {
            //     "authorization": `Bearer ${localStorage.getItem("token")}`
            // }
        })
            .then(res => {
                // setZaps(res.data.workflow.sort((a:any,b:any)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
                setworkflows(res.data.workflows);
                setLoading(false)
            })
    }, [refresh]);
     
    
    return {
        loading, workflows
    }
}

// export function Workflows({setcard ,settoasts,card}:{card:string,settoasts:Dispatch<SetStateAction<any>>,setcard:Dispatch<SetStateAction<string>>}){
    export function  Workflows(){
        const [refreshTrigger, setRefreshTrigger] = useState(false);
    const { loading, workflows } = useWorkflow(refreshTrigger);
    const [filter1,setfilter1] = useState("ALL")
    const [search,setsearch] = useState("")
     console.log("here",workflows)
    const filteredzap = useMemo(()=>{
        return workflows.filter((workflow)=>{
           const MatchStatus =  filter1 == "ALL" || workflow.status === filter1
           
           const MatchSearch =  workflow.name.toLowerCase().includes(search.toLowerCase()) 

           return MatchStatus && MatchSearch 
        }) 
    },[filter1,workflows,search])

    const router = useRouter();
    return <div className="flex flex-col gap-4 px-24  w-full">
                    <div className="flex justify-between mt-6 items-center ">
                        <div className=" text-[28px] tracking-tight  font-semibold text-[#191919] dark:text-[#F0F0F0] "> Automations </div>
                    <div className="flex flex-row-reverse gap-3">
                        <div onClick={()=>{}} className="w-43 flex  transition-all duration-150 active:scale-95   font-semibold rounded-xl justify-center text-sm  px-2.5 h-7.5 gap-1.5 cursor-default items-center bg-brand-dark-bg text-brand-bg dark:bg-brand-bg  dark:text-brand-dark-bg">
                            <Add size="18"></Add>
                            <div onClick={async()=>{
                                 const workflow = await axios.post(`${BACKEND_URL}/api/v1/workflow`)
                                 router.push(`/workflow/${workflow.data.workflow.id}`)
                            }}>Create Automation</div>
                        </div>
                    </div>
                    </div>
                    <div className="flex justify-between mt-5 items-center gap-2">
                        <div className="h-8 w-[80%]">
                            <Secondarybutton onclick={()=>{}}>
                                <div className="flex h-full items-center gap-2 w-full">
                                    <Search size="16"></Search>
                                    <input onChange={(a:any)=> setsearch(a.target.value)} value={search} className=" outline-0 flex-2" placeholder="Search..."></input>
                                </div>
                            </Secondarybutton>
                        </div>
                        <div className="w-[20%]">
                             <OpenerBoxWithOptions options={["ALL","ACTIVE","PAUSED","DRAFT"]} simplefilter={filter1} setsimplefilter={setfilter1} ></OpenerBoxWithOptions> 
                        </div>
                        
                    </div>
                    <div className=" h-8">
                        <Secondarybutton onclick={()=>{}} >
                            <div className="flex justify-between w-full text-xs p-1">
                                <div className="w-[25%] text-start">Name</div>
                                <div className="w-[25%] ">id</div>
                                <div className="w-[20%] ">Status</div>
                                <div className="w-[15%]">Runs</div>
                                <div className="w-[15%]  ">Created</div>
                            </div>
                        </Secondarybutton>
                        {loading ? <div className="bg-brand-bg dark:bg-brand-dark-bg h-screen w-full flex justify-center mt-40">
                                     <Spin></Spin>
                                </div>
                              : <div className="flex justify-center"> <ZapTable setRefreshTrigger={setRefreshTrigger} filteredzap={filteredzap} /> </div>} 
                    </div>
             </div>

}



function ZapTable({ filteredzap, setRefreshTrigger }: {setRefreshTrigger :Dispatch<SetStateAction<boolean>> ,filteredzap: Zap[]}) {
    const [option,setoption] = useState<any>({open : false , id : null})
    const [WorkflowName,setWorkflowName] = useState<any>("")
    const [workflowid,setworkflowid] = useState("")
    const [updateform,setupdateform] = useState(false)


    const router = useRouter();
    const openmodalref = useRef<HTMLDivElement>(null)

     useEffect(()=>{
            const clickeventfunc = (a:any) => {
                if (openmodalref.current && !openmodalref.current.contains(a.target)) {
                    setoption((prev:any)=>{ 
                       return {open : false , id : prev.id}
                    })
                }
            }
            document.addEventListener("mousedown",clickeventfunc)
            return ()=>{
                document.removeEventListener("mousedown",clickeventfunc)
            }
        },[])
    return <div className=" w-full">
       
        {filteredzap.map((z,index) => 
          <div key={index} className=" relative py-3 px-3 flex w-full items-center justify-between border-b  border-[#EEEEEE]  dark:border-[#191B1E] cursor-pointer dark:text-[#9C9FA0] text-[#404040]   tracking-normal text-xs font-semibold">
            <div className="w-[25%] flex-1 flex  gap-4">
                <div>
                    <Svgframe status={z.status.toLowerCase()}>
                            <SvgforActionsTriggers size="18" name={"Workflow"}></SvgforActionsTriggers>
                    </Svgframe>
                 </div>
                <div onClick={()=>router.push(`/workflow/${z.id}`)} className="overflow-scroll min-w-[70%] scrollbar-none dark:text-[#F0F0F0] text-[#191919]  flex items-center gap-3 underline decoration-dashed decoration-[#EEEEEE] dark:decoration-[#191B1E] hover:decoration-blue-400 dark:hover:decoration-[#EEEEEE]  underline-offset-6 transition-all duration-400 text-sm font-normal dark:font-semibold">
                      {z.name}
                </div>
            </div>

            <div className="w-[25%] flex justify-center">{z.id}</div>

            <div className="w-[20%]  flex justify-center ">
                <StatusButton status={z.status.toString().toLowerCase()}></StatusButton>
            </div>

            <div className="w-[15%] flex justify-center">{z.runs}</div>

             <div className="w-[15%] flex justify-center flex-row-reverse">
                         <DateConverter isoString={z.createdAt}></DateConverter>
            </div>
            <div className="w-[5%] flex items-center justify-end relative" 
               ref={option.open && option.id == index ? openmodalref : null} >

                <div 
                    onClick={(a)=>{
                        setoption({open: !option.open , id : index})
                        setworkflowid(z.id as string)
                    }}
                    className=" select-none hover:bg-[#E9E9E9] pt-1 hover:dark:bg-[#151619] h-8 w-8  rounded-xl  flex justify-center">
                    ...
                </div>
                                    <div className={`absolute  w-45 top-8 z-10 right-0 transition duration-100 ${ option.open && index == option.id ?  "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                                        <Opneframe>
                                                <div onClick={()=>{}} className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                                    <div onClick={async()=> {
                                                        const response = await StatusToggler(z.status,z.id)
                                                        setoption({open:false , id : null})
                                                        setRefreshTrigger((prev)=>!prev)
                                                    }} className="m-1">
                                                        <MainButton name={z.status !== ZapStatus.ACTIVE ?"Active Workflow" : "Pause Workflow"}>
                                                            {z.status !== ZapStatus.ACTIVE ?<Play size="17"></Play>  :<Pause size="19"></Pause>}
                                                        </MainButton>
                                                    </div>
                                                </div>
                                                <div onClick={()=>{}} className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                                    <div onClick={()=> {
                                                           setWorkflowName(z.name)
                                                           setupdateform(true)
                                                           setoption({open:false , id : null})
                                                    }} className="m-1">
                                                        <MainButton name="Rename Workflow">
                                                            <Edit size="17"></Edit>
                                                        </MainButton>
                                                    </div>
                                                </div>
                                                <div onClick={()=>{}} className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                                    <div onClick={async()=> {
                                                         try{
                                                           const response = await axios.post(`${BACKEND_URL}/api/v1/workflow/duplicate`,{
                                                                 workflowid 
                                                            })
                                                            setRefreshTrigger((prev)=>!prev)
                                                            // toastsetterremover(settoasts,{msg :response.data.msg,isError:false})
                                                            setoption({open:false , id : null})

                                                        }catch(err:any){
                                                            setoption({open:false , id : null})
                                                            // toastsetterremover(settoasts,{msg : err.response?.data?.err ?? "Something went wrong",isError:true})
                                                        }
                                                        
                                                           
                                                    }} className="m-1">
                                                        <MainButton name="Duplicate Workflow">
                                                            <Duplicate size="17"></Duplicate>
                                                        </MainButton>
                                                    </div>
                                                </div>


                                                <div className="border-t border-[#C6C6C6] dark:border-[#2C3034]"></div>
                                                <div  className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                                    <div onClick={async()=>{
                                                         try{
                                                           const response = await axios.delete(`${BACKEND_URL}/api/v1/workflow/delete`,{
                                                             data : {
                                                                 name : z.name,
                                                                 workflowid : workflowid
                                                             }
                                                            })
                                                            setRefreshTrigger((prev)=>!prev)
                                                            // toastsetterremover(settoasts,{msg :response.data.msg,isError:false})
                                                            setoption({open:false , id : null})

                                                        }catch(err:any){
                                                            setoption({open:false , id : null})
                                                            // toastsetterremover(settoasts,{msg : err.response?.data?.err ?? "Something went wrong",isError:true})
                                                        }

                                                    }} className="m-1 ">
                                                        <MainRedButton name="Delete Workflow">
                                                            <Bin size="17"></Bin>
                                                        </MainRedButton>
                                                    </div>
                                                </div>
                                        </Opneframe>
                    </div> 
            </div>
        </div>)}
        

        { updateform ?
            <Addform  callback={async()=>{
                try{
                    const response : any= await axios.put(`${BACKEND_URL}/api/v1/workflow/rename`,{
                        newname : WorkflowName, 
                        workflowid : workflowid
                    })
                    setRefreshTrigger((prev)=>!prev)
                    // toastsetterremover(settoasts,{msg :response.data.msg,isError:false})
                    setoption({open:false , id : null})
                    setupdateform(false)
                }catch(err:any){
                    setupdateform(false)
                    setoption({open:false , id : null})
                    // toastsetterremover(settoasts,{msg : err.response?.data?.err ?? "Something went wrong",isError:true})
                }
                
                    
                    
            }} name={"Rename workflow"} buttonname={"Rename"} formopen={updateform} setformopen={setupdateform}>
                <div className="my-6  w-115">
                    <Input placeholder="mI2DyWosumKcWdkDg0GI592C0wGSUZoF" name="Name" state={WorkflowName} statesetter={setWorkflowName}></Input>
                </div>

            </Addform> : ""
        }
    </div>

}


async function StatusToggler(crrstatus : ZapStatus,workflowid:String){
    // const zapstatus = await axios.put(`${BACKEND_URL}/api/v1/workflow/rename`,{
    //     crrstatus,
    //     workflowid
    // }) 
    // return zapstatus.data.msg
}  