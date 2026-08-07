"use client"
import { DarkButton } from "@/comp/buttons/darkbutton";
import { MainButton, MainRedButton } from "@/comp/buttons/mainbutton";
import { Namebox } from "@/comp/buttons/namebox";
import { Secondarybutton } from "@/comp/buttons/secondarybutton";
// import { DiscordConfigPanel } from "@/comp/discord";
import axios, { Axios, AxiosError } from "axios";
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
import toastsetterremover, { showToastDataType } from "./toastfunction";
import Spin from "./buttons/spinningwheel";
import useToastSetterRemover from "./toastfunction";
import { Deletebutton, DeleteConfirm } from "./deleteconfirmation";
import { api } from "@/lib/api";
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative";
import { Workflow } from "./ReactWorkflow";
import { ToastType } from "./toastprovider";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

enum ZapStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED" ,
  DRAFT = "DRAFT"
}

function useWorkflow(refresh:boolean,showToast:(data:showToastDataType)=>void) {
    const [loading, setLoading] = useState(true);
    const [workflows, setworkflows] = useState<Workflow[]>([]);

    useEffect(() => {
        api.get(`${BACKEND_URL}/api/v1/workflow/all?t=${Date.now()}`)
            .then(res => {
                setworkflows(res.data.workflows.sort((a:Workflow,b:Workflow)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
                setLoading(false)
            })
            .catch((err:unknown)=>{
                const error = err as AxiosError<{message:string}>
                setLoading(false);
                showToast({
                    message: error.response?.data?.message ?? "Failed to load workflows",
                    isError:true
                }
    );
});
    }, [refresh]);
     
    
    return {
        loading, workflows
    }
}

    export function  Workflows(){
        const [refreshTrigger, setRefreshTrigger] = useState(false);
        const [filter1,setfilter1] = useState("ALL")
        const [search,setsearch] = useState("")
        const showToast = useToastSetterRemover()
        const { loading, workflows } = useWorkflow(refreshTrigger,showToast);
        const [createloading,setcreateloading] = useState(false)
        const filteredzap = useMemo(()=>{
            return workflows.filter((workflow)=>{
            const MatchStatus =  filter1 == "ALL" || workflow.status === filter1
            
            const MatchSearch =  workflow.name.toLowerCase().includes(search.toLowerCase()) 

            return MatchStatus && MatchSearch 
            }) 
        },[filter1,workflows,search])
          const router = useRouter();
    return <div className="flex flex-col gap-4 px-10 lg:px-24 w-full">
                    <div className="flex justify-between mt-6 items-center ">
                        <div className="text-lg lg:text-[28px] tracking-tight   font-semibold text-[#191919] dark:text-[#F0F0F0] "> Automations </div>
                    <div className="flex flex-row-reverse gap-3">
                        <div onClick={async()=>{
                                try{
                                    setcreateloading(true)
                                    const workflow = await api.post(`${BACKEND_URL}/api/v1/workflow`)
                                    // showToast({msg :workflow.data.msg,isError:false})
                                    setcreateloading(false)
                                    router.push(`/workflow/${workflow.data.workflow.id}`)
                                }catch(err:unknown){
                                    const error = err as AxiosError<{message:string}>
                                    setcreateloading(false)
                                    showToast({message : error.response?.data?.message ?? "Failed to create workflow",isError:true})
                                }
                            }} className={`${createloading ? "opacity-60 pointer-events-none" : ""} w-full lg:w-43 flex  transition-all duration-50 active:scale-95   font-semibold rounded-xl justify-center text-xs lg:text-sm  px-2 lg:px-2.5 h-6 lg:h-7.5 gap-1 lg:gap-2.5 cursor-default items-center bg-brand-dark-bg text-brand-bg dark:bg-brand-bg  dark:text-brand-dark-bg`}>
                            <div>
                                {createloading ? "Creating..." : "Create Automation"}
                            </div>
                            {createloading ?
                             <div className=" h-3 w-3 rounded-full border-2 border-brand-border  border-t-brand-dark-bg dark:border-t-[#151619]  animate-spin" /> 
                            :
                            <Add size="18"></Add>}
                        </div>
                    </div>
                    </div>
                    <div className="flex justify-between mt-5 items-center gap-2">
                        <div className="h-full lg:w-[80%] w-[70%]">
                            <Secondarybutton onclick={()=>{}}>
                                <div className="flex h-full items-center gap-2 w-full">
                                    <Search size="16"></Search>
                                    <input onChange={(a)=> setsearch(a.target.value)} value={search} className=" outline-0 flex-2" placeholder="Search..."></input>
                                </div>
                            </Secondarybutton>
                        </div>
                        <div className="w-[30%] lg:w-[20%]">
                             <OpenerBoxWithOptions options={["ALL","ACTIVE","PAUSED","DRAFT"]} simplefilter={filter1} setsimplefilter={setfilter1} ></OpenerBoxWithOptions> 
                        </div>
                        
                    </div>
                    <div className=" h-8">
                        <Secondarybutton onclick={()=>{}} >
                            <div className="flex justify-between w-full text-xs p-1">
                                <div className="w-[50%] xl:w-[35%] lg:w-[60%]  md:w-[60%] sm:w-[80%]  text-start">Name</div>
                                <div className="w-[25%] xl-w-[25%]  hidden xl:block">id</div>
                                <div className="w-[30%] xl:w-[20%] lg:w-[15%] md:w-[10%] sm:w-[10%]">Status</div>
                                <div className="w-[25%] xl:w-[15%] lg:w-[10%] md:w-[10%]   hidden md:block ">Created</div>
                                <div className=" hidden sm:block w-[5%]"></div>
                            </div>
                        </Secondarybutton>
                        {loading ? <div className="bg-brand-bg dark:bg-brand-dark-bg h-screen w-full flex justify-center mt-40">
                                     <Spin></Spin>
                                </div>
                              : <div className="flex justify-center"> <ZapTable setRefreshTrigger={setRefreshTrigger} filteredzap={filteredzap} /> </div>} 
                    </div>
             </div>

}

type workflowoptions = {open : boolean , id : number | null}


function ZapTable({ filteredzap, setRefreshTrigger }: {setRefreshTrigger :Dispatch<SetStateAction<boolean>> ,filteredzap: Workflow[]}) {
    const [option,setoption] = useState<workflowoptions>({open : false , id : null})
    const [WorkflowName,setWorkflowName] = useState<string>("")
    const [workflowid,setworkflowid] = useState("")
    const [updateform,setupdateform] = useState(false)

    const [loading,setLoading] = useState(false)
    const router = useRouter();
    const openmodalref = useRef<HTMLDivElement>(null)
    const showToast = useToastSetterRemover()

    const [renameFormErrors ,setrenameFormErrors] = useState<Record<string,string>>({})
    const [deleteformopen ,setdeleteformopen] = useState(false)
    
    
     useEffect(()=>{
            const clickeventfunc = (a:MouseEvent) => {
                if (openmodalref.current && !openmodalref.current.contains(a.target as Node)) {
                    setoption((prev)=>{ 
                       return {open : false , id : prev.id}
                    })
                }
            }
            document.addEventListener("mousedown",clickeventfunc)
            return ()=>{
                document.removeEventListener("mousedown",clickeventfunc)
            }
        },[])

     function validateForm(){
        const Errs:Record<string,string> = {}
        if (!WorkflowName.trim()) {
            Errs.WorkflowName = "WorkflowName is required"
        }
        setrenameFormErrors(Errs)
        return Object.keys(Errs).length === 0
     }   

     if (!filteredzap.length) {
          return <div className="h-90 flex flex-col items-center justify-center">
            <div className="text-sm font-medium dark:text-[#F0F0F0] text-[#191919]">
                You haven't created no workflows
            </div>

            <div className="mt-1 text-xs dark:text-[#9C9FA0] text-[#666666]">
               Get started by creating a workflow 
            </div>
        </div>
     }
    return <div className=" w-full">
        {filteredzap.map((z,index) => 
          <div key={index} className=" relative py-3 px-3 flex w-full items-center justify-between border-b  border-[#EEEEEE]  dark:border-[#191B1E] cursor-pointer dark:text-[#9C9FA0] text-[#404040]   tracking-normal text-xs font-semibold">
            <div className="w-[25%] flex-1 flex  gap-4">
                <div className="hidden md:block">
                    <Svgframe status={z.status.toLowerCase()}>
                            <SvgforActionsTriggers size="18" name={"Workflow"}></SvgforActionsTriggers>
                    </Svgframe>
                 </div>
                <div onClick={()=>router.push(`/workflow/${z.id}`)} className=" overflow-scroll min-w-[70%] scrollbar-none dark:text-[#F0F0F0] text-[#191919]  flex items-center gap-3 underline decoration-dashed decoration-[#EEEEEE] dark:decoration-[#191B1E] hover:decoration-blue-400 dark:hover:decoration-[#EEEEEE]  underline-offset-6 transition-all duration-100 md:text-sm text-xs font-normal dark:font-semibold">
                      {z.name}
                </div>
            </div>

            <div className= "hidden xl:flex w-[25%]  justify-center">{z.id}</div>

            <div className="w-[20%]  flex justify-center ">
                <StatusButton status={z.status.toString().toLowerCase()}></StatusButton>
            </div>

            {/* <div className= "w-[15%] flex justify-center">{z.runs}</div> */}

             <div className="hidden md:flex  w-[15%] justify-center flex-row-reverse">
                         <DateConverter isoString={z.createdAt}></DateConverter>
            </div>
            <div className="w-[5%] flex items-center justify-end relative"  ref={option.open && option.id == index ? openmodalref : null} >
                <div 
                    onClick={(a)=>{
                        setoption({open: !option.open , id : index})
                        setworkflowid(z.id as string)
                    }}
                    className=" select-none md:hover:bg-[#E9E9E9] pt-1 md:hover:dark:bg-[#151619] h-8 w-8  rounded-xl  flex justify-center">
                    ...
                </div>
                <div className={`absolute  w-45 top-8 z-40 right-0 transition duration-100 ${ option.open && index == option.id ?  "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                    <Opneframe>
                            <div onClick={()=>{}} className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                <div onClick={async()=> {
                                    try{
                                        setoption({open:false , id : null})
                                        const response = await api.post(`${BACKEND_URL}/api/v1/workflow/togglestatus`,
                                            {
                                                crrstatus:z.status,
                                                workflowid
                                            }) 
                                            showToast({message :response.data.message,isError:false})

                                            setRefreshTrigger((prev)=>!prev)
                                        }catch(err:unknown){
                                            const error = err as AxiosError<{errors:string[]}>
                                            setoption({open:false,id:null});
                                                if(error.response?.data?.errors){
                                                    if (error.response.data.errors.length > 2) {
                                                        showToast({
                                                            message:"workflow couldn't be enabled",
                                                            isError:true,
                                                            submessage:"Open the workflow to fix the issues that need attention."
                                                        })
                                                        return
                                                    }
                                                    error.response.data.errors.forEach((error:string)=>{
                                                        showToast({
                                                            message:error,
                                                            isError:true
                                                        })
                                                    })
                                                }else{
                                                    showToast({
                                                        message:"Failed to change workflow status",
                                                        isError:true
                                                    })
                                                }
                                        }
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
                                        setoption({open:false , id : null})
                                        const response = await api.post(`${BACKEND_URL}/api/v1/workflow/duplicate`,{
                                                workflowid : z.id 
                                        })
                                        setRefreshTrigger((prev)=>!prev)

                                    }catch(err:unknown){
                                        const error = err as AxiosError<{message:string}>
                                        showToast({message : error.response?.data?.message ?? "Failed to duplicate workflow",isError:true})
                                        setoption({open:false , id : null})
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
                                        setoption({open:false , id : index})
                                        setdeleteformopen(true)
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
         <DeleteConfirm buttonname="" callback={()=>{}}  name={"Delete Workflow"} setformopen={setdeleteformopen} formopen={deleteformopen}>
                    <div className=" pt-5 text-sm">{ option.id == 0 || option.id ?filteredzap[option.id].name:"invalid id "}</div>
                    <div className="my-7  min-w-40 lg:w-100">
                        <div className="text-sm ">Are you sure you want to delete this WorkFlow ?</div>
                        <div className="text-sm font-medium text-[#CE292E] dark:text-[#FF9592]">This can not be undone.</div>
                    </div>
                    <div  className="flex gap-2 w-full">
                        <div onClick={async()=>{
                            if (!workflowid) {
                               return ;
                            }
                            try {
                                setdeleteformopen(false)
                                const response = await api.delete(`${BACKEND_URL}/api/v1/workflow/delete`,{
                                    data : {
                                        workflowid : workflowid
                                    }
                                })
                                setoption((prev)=> ({open:false , id :null }))
                                setRefreshTrigger((prev)=>!prev)
                            } catch (err:unknown) {
                                const error = err as AxiosError<{message:string}>
                                showToast({message :error.response?.data?.message ?? "Failed to delete workflow",isError:false})
                            }
                            
                            }} className="h-7 lg:h-8 min-w-30 transition-all duration-50 active:scale-95">
                                <Deletebutton  name={"Delete WorkFlow"}>
                                </Deletebutton>
                            </div>
                            <div onClick={()=>{setdeleteformopen(!open)}} className="h-8 w-30 transition-all duration-50 active:scale-95 ">
                                <Secondarybutton>
                                    <div className=" px-1  text-sm pb-0.5">
                                        Cancle
                                    </div>
                                </Secondarybutton>
                            </div>
                    </div>
         </DeleteConfirm>   

        { updateform ?
            <Addform manualbutton={true} callback={async()=>{}} name={"Rename workflow"} buttonname={"Rename"} formopen={updateform} setformopen={setupdateform}>
                <div className="my-6   min-w-40 lg:w-100">
                    <Input placeholder="mI2DyWosumKcWdkDg0GI592C0wGSUZoF" name="Name" state={WorkflowName} statesetter={(a)=>{
                        setWorkflowName(a)
                        setrenameFormErrors((prev)=>{
                            return {...prev ,WorkflowName:"" }
                        })
                    }}></Input>
                    {renameFormErrors.WorkflowName&&
                                <div className="mt-1 text-xs text-red-500">
                                    {renameFormErrors.WorkflowName}
                    </div>}
                </div>
                 <div  className="flex gap-2 w-full">
                    <div onClick={async()=>{
                                try{
                                    if (!validateForm()) {
                                        return
                                    }
                                    setLoading(true)
                                    const response = await api.put(`${BACKEND_URL}/api/v1/workflow/rename`,{
                                        newname : WorkflowName, 
                                        workflowid : workflowid
                                    })
                                    setRefreshTrigger((prev)=>!prev)
                                    setLoading(false)
                                    setoption({open:false , id : null})
                                    setupdateform(false)
                                }catch(err:unknown){                                            
                                    const error = err as AxiosError<{message:string}>
                                    setLoading(false)
                                    setupdateform(false)
                                    setoption({open:false , id : null})
                                    showToast({message:error.response?.data?.message ?? "Failed to rename workflow",isError:true})
                                }
                            }} className="h-7 lg:h-8 w-30 transition-all duration-50 active:scale-95">
                        <SecondarybuttonNegative>
                            <div className="w-full px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                {loading?
                                <div className=" w-full flex justify-center">
                                    <div className=" h-5 w-5 rounded-full border-2 border-brand-border  border-t-brand-dark-bg dark:border-t-[#151619]  animate-spin" /> 
                                </div>
                                :  "Add"}
                            </div>
                        </SecondarybuttonNegative>
                    </div>
                    <div onClick={()=>{setupdateform(!open)}} className="h-8 w-30 transition-all duration-50 active:scale-95 ">
                        <Secondarybutton>
                            <div className="flex w-full justify-center px-1  text-sm pb-0.5">
                                Cancle
                            </div>
                        </Secondarybutton>
                    </div>
                                    </div>
            </Addform> : ""
        }
    </div>

}
