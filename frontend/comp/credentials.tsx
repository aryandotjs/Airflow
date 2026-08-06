"use client"
import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import { Secondarybutton } from "./buttons/secondarybutton"
import { Add, Bin, Check, DownArrow, Edit, Locksvg, Openup, Prev, Search, UpArrow } from "./svg/allsvg"
import { MainButton, MainRedButton } from "./buttons/mainbutton"
import { Opneframe } from "./openframe"
import { Addform } from "./addform"
import { Input } from "./buttons/input"
import { OpenerBoxWithOptions } from "./OpenerBoxWithOptions"
import axios from "axios"
import { DateConverter } from "./RunTimeBadge"
import { SvgforActionsTriggers } from "./SvgforActionsTriggers"
import Spin from "./buttons/spinningwheel"
import toastsetterremover from "./toastfunction"
import { useToast } from "./toastprovider"
import useToastSetterRemover from "./toastfunction"
import { Deletebutton, DeleteConfirm } from "./deleteconfirmation"
import { api } from "@/lib/api"
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function Credentials(){
     const [refreshTrigger, setRefreshTrigger] = useState(false);
     const [allcreds ,setallcreds] = useState()
     const [Errors ,setErrors] = useState<any>({})
    const [loading,setloading] =  useState(false)

     const defaultValue = {credName:"",Apikey:"",type:""}
     const [formData ,setformData] = useState(defaultValue)


     const [formopen ,setformopen] = useState(false)

     const [filter1,setfilter1] = useState("ALL")
     const [search,setsearch] = useState("")
     const {toasts, setToasts} = useToast()
     
     const showToast = useToastSetterRemover()
    
     useEffect(()=>{
         api.get(`${BACKEND_URL}/api/v1/credentials/all`).then((a)=>{
             setallcreds(a.data.credential.sort((a:any,b:any)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
         }).catch((err:any)=>{
            showToast({
                msg: err.response?.data?.message ?? "Failed to load credentials",
                isError:true
            })
         })
     },[refreshTrigger])
     
     const filteredCreds = useMemo(()=>{
          return (allcreds ?? []).filter((a:any)=>{
              const MatchFilter = filter1 == "ALL" || a.type === filter1 
              const MatchSearch = a.name.toLowerCase().includes(search.toLowerCase())
              return MatchSearch && MatchFilter
           })
     },[allcreds,search,filter1])


    //  function validateForm(){
    //     const Errs:any = {}
    //     if (!formData.Apikey.trim()) {
    //         Errs.Apikey = "API key required"
    //     }
    //     if (!formData.credName.trim()) {
    //         Errs.credName = "Name required"
    //     }
    //     if (!formData.type) {
    //         Errs.type = "type required"
    //     }
    //     setErrors(Errs)
    //     return Object.keys(Errs).length === 0
    //  }
       
        return <div className={` flex flex-col gap-4 px-10 lg:px-24 h-screen`}>
            <div className="flex justify-between mt-6 items-center ">
                <div className=" text-lg lg:text-[28px] tracking-tight  font-semibold  dark:text-brand-bg text-brand-dark-bg">Credentials</div>
                <div onClick={()=>{setformopen(!formopen)}} className=" flex transition-all duration-50 active:scale-95   font-semibold rounded-xl justify-center text-xs lg:text-sm  px-2.5 h-6 lg:h-7.5 gap-1.5 cursor-default items-center bg-brand-dark-bg text-brand-bg dark:bg-brand-bg  dark:text-brand-dark-bg">
                    <div>Add Credentials</div>
                    <Add size="18"></Add>
                </div>
            </div>
            <div className="flex justify-between mt-5 items-center gap-2">
                <div className="h-7 lg:h-8 w-[60%] lg:w-[70%] ">
                    <Secondarybutton onclick={()=>{}}>
                        <div className="flex h-full items-center gap-2 w-full">
                            <Search size="16"></Search>
                            <input className=" outline-0 flex-2" value={search} onChange={(a)=> setsearch(a.target.value)} placeholder="Search..."></input>
                        </div>
                    </Secondarybutton>
                </div>
                <div className="w-[40%] lg:w-[30%] ">
                     <OpenerBoxWithOptions options={["ALL" , "GEMINI" , "CHATGPT","CLAUDE","DISCORD"]} simplefilter={filter1} setsimplefilter={setfilter1} ></OpenerBoxWithOptions> 
                </div>
            </div>
            <div className="h-7 lg:h-8">
                <Secondarybutton onclick={()=>{}} >
                    <div className="flex justify-between w-full text-xs ">
                        <div className="w-[20%] flex  ">Name</div>
                        <div className="w-[20%] hidden lg:flex justify-center">Token</div>
                        <div className="w-[20%] flex justify-center">type</div>
                        {/* <div className="w-[13%] flex justify-start">Total uses</div> */}
                        {/* <div className="w-[13%] flex justify-start">Last used</div> */}
                        <div className="w-[20%] flex justify-center">
                            <div className="hidden lg:block ">updated/</div> <div>Created</div>
                        </div>
                        <div className="w-[20%] flex justify-center"></div>
                    </div>
                </Secondarybutton>
                    {!allcreds ? 
                        <div className="bg-brand-bg dark:bg-brand-dark-bg  w-full flex justify-center mt-40 ">
                            <Spin></Spin>
                        </div> :
                        <CredHistory setRefreshTrigger={setRefreshTrigger} filteredCreds={filteredCreds}></CredHistory> 
                    }
            </div>
            
                 <Addform manualbutton={true} callback={()=>{}}  name={"Add credentials"} formopen={formopen} buttonname="Add" setformopen={setformopen}>
                    <div className="my-6 flex flex-col gap-4 min-w-70 lg:w-115">
                            <div>
                                <Input placeholder="Credentials Name" name="Name" state={formData.credName} statesetter={(a)=>{
                                        setformData((prev:any)=>{
                                            return {
                                                ...prev,
                                                credName : a
                                                }
                                            })
                                            setErrors((Prev:any)=>{
                                                return {...Prev,credName:""}
                                            })
                                            }}>
                                </Input>
                                {Errors.credName&&
                                <div className="mt-1 text-xs text-red-500">
                                    {Errors.credName}
                                </div>}
                            </div>
                           <div className="w-40 flex flex-col gap-2 text-sm font-medium">
                               <div className="">Type</div>
                            <OpenerBoxWithOptions options={["CHATGPT" , "GEMINI","CLAUDE","DISCORD"]} simplefilter={formData.type||"Select Type"} setsimplefilter={(a)=>{
                                setformData((prev:any)=>{
                                    return {
                                        ...prev,
                                        type : a
                                    }
                                })
                                setErrors((Prev:any)=>{
                                                return {...Prev,type:""}
                                            })
                            }} ></OpenerBoxWithOptions> 
                            {Errors.type&&
                                <div className="mt-1 text-xs text-red-500">
                                    {Errors.type}
                                </div>}
                           </div>
                           <div>
                                <Input placeholder="mI2DyWosumKcWdkDg0GI592C0wGSUZoF" name="API Key" state={formData.Apikey} statesetter={(a)=>{
                                    setformData((prev:any)=>{
                                    return {
                                            ...prev,
                                            Apikey : a
                                        }
                                    })
                                     setErrors((Prev:any)=>{
                                                return {...Prev,Apikey:""}
                                        })
                                }}></Input>
                                {Errors.Apikey&&
                                <div className="mt-1 text-xs text-red-500">
                                    {Errors.Apikey}
                                </div>}
                           </div>
                           <div  className="flex gap-2 w-full">
                                <div onClick={ async()=>{ try{
                                        if (!validateForm({formData,setErrors})) {
                                            return
                                        }
                                        setloading(true)
                                        const response : any= await api.post(`${BACKEND_URL}/api/v1/credentials/create`,{
                                                name : formData.credName,
                                                apikey :formData.Apikey ,
                                                type : formData.type
                                        })
                                            setloading(false)
                                            setformopen(false)
                                            setformData(defaultValue)
                                            setRefreshTrigger((prev)=>!prev)
                                            showToast({msg :response.data.msg,isError:false})
                                        }catch(err:any){
                                            setloading(false)
                                            showToast({msg : err.response?.data?.err ?? "Failed to create credential",isError:true})
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
                                <div onClick={()=>{setformopen(!open)}} className="h-8 w-30 transition-all duration-50 active:scale-95 ">
                                    <Secondarybutton>
                                        <div className="flex w-full justify-center px-1  text-sm pb-0.5">
                                            Cancle
                                        </div>
                                    </Secondarybutton>
                                </div>
                            </div>
                    </div>
                </Addform>
     </div>
     }
     


function CredHistory({filteredCreds,setRefreshTrigger} : {setRefreshTrigger:Dispatch<SetStateAction<boolean>>,filteredCreds : any}){

        const [option,setoption] = useState({open : false , id : null})

        const [updateform,setupdateform] = useState(false)

        const openmodalref = useRef<HTMLDivElement>(null)
         
        

        const defaultValue = {credName:"",Apikey:"",type:""}
        const [formData ,setformData] = useState(defaultValue)
        const [Errors ,setErrors] = useState<any>({})


        const [crediddb ,setcrediddb] = useState("")

        const [deleteformopen ,setdeleteformopen] = useState(false)
        const [loading,setloading] =  useState(false)
        
        const showToast = useToastSetterRemover()
        
        useEffect(()=>{
            const clickeventfunc = (a:any) => {
                if (openmodalref.current && !openmodalref.current.contains(a.target)) {
                    setoption((prev)=>{ 
                       return {open : false , id : null}
                    })
                }
            }
            document.addEventListener("mousedown",clickeventfunc)
            return ()=>{
                document.removeEventListener("mousedown",clickeventfunc)
            }
        },[])
        if (filteredCreds.length === 0) {
            return <div className="flex h-90 flex-col items-center justify-center">
        <div className="text-sm font-medium dark:text-[#F0F0F0] text-[#191919]">
            No credentials yet
        </div>

        <div className="mt-2 text-xs dark:text-[#9C9FA0] text-[#666666]">
            Add your first credential to connect external services.
        </div>
    </div>
        }
        return <div className="px-2 pr-4 ">
            {/* {crediddb} */}
            {/* {JSON.stringify(option)} */}
            {filteredCreds.map((z:any,index:any)=>{
                return <div key={index} className="relative flex w-full items-center justify-between border-b  border-[#EEEEEE]  dark:border-[#191B1E] cursor-pointer dark:text-[#9C9FA0] text-[#404040]   tracking-normal text-xs font-semibold ">
                        <div className="flex w-full h-8 my-3 gap-2 justify-between">
                            <div className="  flex items-center  gap-3 w-[20%] overflow-hidden">
                                <div className="hidden sm:flex">
                                    <Svgframe status="Success">
                                        <SvgforActionsTriggers size="18" name={"Lock"}></SvgforActionsTriggers>
                                    </Svgframe>
                                </div>
                                <div onClick={()=>{ 
                                   
                                    }} className="w-[30%]  flex items-center gap-3 font-normal underline decoration-dashed decoration-[#EEEEEE] dark:decoration-[#191B1E] hover:decoration-blue-400 dark:hover:decoration-[#EEEEEE]  underline-offset-6 transition-all duration-100 text-xs dark:font-medium dark:text-[#F0F0F0] text-[#191919]">
                                    {z.name}
                                </div>
                                
                            </div>
                        
                            <div className="w-[20%] hidden  lg:flex justify-center pl-3  items-center overflow-hidden">
                                <div className="bg-[#E9E9E9]  dark:bg-[#151619] py-0.5 px-2 rounded-lg">
                                <div className="">{z.value.apikey.slice(0,10)}••••••</div>
                                </div>
                            </div>

                            <div className="flex justify-center items-center gap-1.5 w-[20%] font-normal text-sm dark:font-medium dark:text-[#F0F0F0] text-[#191919]">
                                <div className="text-xs">{z.type.toLowerCase()}</div>
                                {/* <div className="h-4 w-4  ">
                                    {z.type === "CLAUDE" ? 
                                    <img src={"./actiontriggerimages/claude.png"}></img> :
                                    z.type === "GEMINI" ? 
                                    <img src={"./actiontriggerimages/gemini.png"}></img> :
                                    z.type === "CHATGPT" ?
                                    <img src={"./actiontriggerimages/chatgpt.png"}></img>:""
                                }
                                </div> */}
                            </div>
                            {/* <div className="flex justify-center items-center  w-[13%] text-xs font-normal dark:font-medium dark:text-[#F0F0F0] text-brand-dark-bg">0</div> */}
                            {/* <div className="flex justify-center items-center  w-[13%] text-xs font-normal dark:font-medium dark:text-[#F0F0F0] text-brand-dark-bg">No Activity</div> */}
                            <div className="w-[20%]  flex items-center justify-center text-xs font-normal dark:font-normal dark:text-[#F0F0F0] text-brand-dark-bg overflow-hidden">
                                <div className="hidden lg:flex">
                                  <DateConverter isoString={z.updatedAt}></DateConverter>/
                                </div>
                                <DateConverter isoString={z.createdAt}></DateConverter>
                            </div>
                            <div ref={option.open &&  option.id === index ? openmodalref : null} className="w-[20%]  flex items-center justify-end">
                                <div 
                                    onClick={(a)=>{
                                        setoption({open:!option.open , id : index})
                                        setcrediddb(z.id)
                                    }}
                                    className=" select-none hover:bg-[#E9E9E9] pt-1 hover:dark:bg-[#151619] h-8 w-8  rounded-xl  flex justify-center  ">
                                    ...
                                </div>
                                <div className={`absolute w-37 lg:w-45 top-11 z-10 right-0 transition duration-100 ${ option.open && index == option.id ?  "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>

                                    <Opneframe>
                                            <div onClick={()=>{}} className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                                <div onClick={()=> {
                                                    setformData({credName:z.name,Apikey:z.value.apikey,type:z.type})
                                                    setupdateform(true)
                                                    setoption({open:false , id : null})
                                                }} className="m-1 ">
                                                    <MainButton name="Edit credential">
                                                        <Edit size="17"></Edit>
                                                    </MainButton>
                                                </div>
                                            </div>
                                            <div className="border-t border-[#C6C6C6] dark:border-[#2C3034]"></div>
                                            <div  className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                                <div onClick={async()=>{
                                                     try{
                                                        setdeleteformopen(true)
                                                        setoption((prev:any)=> ({open:false , id :prev.id }))
                                                    }catch(err:any){
                                                        setoption({open:false , id : null})
                                                        showToast({msg : err.response?.data?.err ?? "Something went wrong",isError:true})
                                                    }
                                                }} className="m-1 ">
                                                    <MainRedButton name="Delete credential">
                                                        <Bin size="17"></Bin>
                                                    </MainRedButton>
                                                </div>
                                            </div>
                                    </Opneframe>
                                    
                                </div> 
                            </div>
                        </div>
                            
                 </div>
            })}
            <DeleteConfirm callback={async()=>{}}  name={"Delete API Key"} setformopen={setdeleteformopen} formopen={deleteformopen}>
                                    <div className=" pt-5 text-sm">{ option.id == "0" || option.id ?filteredCreds[option.id].name:"invalid id "}</div>
                                    <div className="my-7 min-w-40 lg:w-100">
                                        <div className="text-sm ">Are you sure you want to delete this API Key?</div>
                                        <div className="text-sm font-medium text-[#CE292E] dark:text-[#FF9592]">This can not be undone.</div>
                                    </div>
                                    <div  className="flex gap-2 w-full">
                                            <div onClick={async()=>{
                                                if (!crediddb) {
                                                    return ;
                                                    }
                                                try {
                                                    setdeleteformopen(false)
                                                    const response = await api.delete(`${BACKEND_URL}/api/v1/credentials/delete`,{
                                                        data : {
                                                            apiId : crediddb
                                                        }
                                                    })
                                                    setoption((prev:any)=> ({open:false , id :null }))
                                                    setRefreshTrigger((prev)=>!prev)

                                                } catch (error:any) {
                                                    showToast({msg :error.response?.data.msg  ?? "Failed to delete credential" ,isError:false})
                                                }
                                            }} className="h-7 lg:h-8 min-w-30 transition-all duration-50 active:scale-95">
                                                <Deletebutton name={"Delete API Key"}></Deletebutton>
                                            </div>
                                            <div onClick={()=>{setdeleteformopen(false)}} className="h-8 w-30 transition-all duration-50 active:scale-95 ">
                                                <Secondarybutton>
                                                    <div className=" px-1  text-sm pb-0.5">
                                                        Cancle
                                                    </div>
                                                </Secondarybutton>
                                            </div>
                                    </div>
                                 
                            </DeleteConfirm>
            <Addform manualbutton={true} callback={()=>{}} name={"Update credentials"} buttonname={"Update"} formopen={updateform} setformopen={setupdateform}>
                
                <div className="my-6 flex flex-col gap-4 min-w-70 lg:w-115">
                    <div>
                            <Input placeholder="Credentials Name" name="Name" state={formData.credName}  statesetter={(a)=>{
                                setformData((prev:any)=>({...prev , credName : a}))   }}>
                            </Input>
                            {Errors.credName&&
                                <div className="mt-1 text-xs text-red-500">
                                {Errors.credName}
                            </div>}
                    </div>
                    
                    <div className="w-40 flex flex-col gap-2 text-sm font-medium">
                        <div className="">Type</div>

                        <OpenerBoxWithOptions options={["CHATGPT" , "GEMINI","CLAUDE","DISCORD"]} simplefilter={formData.type || "Select type"} setsimplefilter={(a)=>{
                            setformData((prev:any)=>({...prev , type : a}))
                        }} ></OpenerBoxWithOptions> 
                        
                        {Errors.type&&
                                <div className="mt-1 text-xs text-red-500">
                                {Errors.type}
                            </div>}
                    </div>
                    <div>
                        <Input placeholder="mI2DyWosumKcWdkDg0GI592C0wGSUZoF" name="API Key" state={formData.Apikey} statesetter={(a)=>{
                            setformData((prev:any)=>({...prev , Apikey : a}))
                        }}></Input>
                        {Errors.Apikey&&
                                <div className="mt-1 text-xs text-red-500">
                                {Errors.Apikey}
                            </div>}
                    </div>
                    <div  className="flex gap-2 w-full">
                                <div onClick={async()=>{
                                    try{
                                        if (!validateForm({formData,setErrors})) {
                                            return
                                        }
                                        setloading(true)    

                                            const response : any= await api.post(`${BACKEND_URL}/api/v1/credentials/update`,{
                                            name : formData.credName,
                                            apikey :formData.Apikey,
                                            type : formData.type,
                                            credid : crediddb
                                        })
                                        setloading(false)    
                                        setupdateform(false)
                                        setRefreshTrigger((prev)=>!prev)
                                        
                                        showToast({msg :response.data.msg,isError:false})
                                    }catch(err:any){
                                        setloading(false)
                                        showToast({msg : err.response?.data?.msg ?? "Failed to update credential",isError:true})
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

                </div>

            </Addform> 

        </div>
}

export function Svgframe({children,status , big = false}: {children:ReactNode,status:string, big? : boolean}){
    return <div className={`h-8 w-8 flex items-center justify-center  border border-[#D6D6D6] dark:border-[#D2D6D5] ${big?  "h-20 w-20 rounded-3xl  border-3 dark:border-2" : "rounded-lg"} `}>
        <div className={`bg-radial  border-brand-bg dark:border-brand-dark-bg h-full w-full flex items-center justify-center ${big?  "rounded-3xl border-3 dark:border-4" : " rounded-lg border-2 "} 
            ${status === "Success" ? "bg-radial from-[#E4F4E9] to-[#E4F4E9] dark:from-[#3BD88C] dark:to-[#041E12] text-[#357557] dark:text-[#D2D6D5]" : 
            status === "Failed" ?  "bg-radial from-[#FCE9EA] to-[#FCE9EA] dark:from-[#9F4345] dark:to-[#2D040B] text-[#9E4245] dark:text-[#D2D6D5]"  :
            status === "Runing" ?  "bg-radial from-[#E4F2FC] to-[#E4F2FC] dark:from-[#0C74CE] dark:to-[#001B3A] text-[#0C74CE] dark:text-[#D2D6D5]"  :
            status === "Disabled" ?  "bg-linear from-[#EEEEEE] to-[#EEEEEE] dark:from-[#414141] dark:to-[#191B1E] "  :""
         }`}>
          {children}
        </div>
    </div>
}



function validateForm({formData,setErrors}:any){
        const Errs:any = {}
        if (!formData.Apikey.trim()) {
            Errs.Apikey = "API key required"
        }
        if (!formData.credName.trim()) {
            Errs.credName = "Name required"
        }
        if (!formData.type) {
            Errs.type = "type required"
        }
        setErrors(Errs)
        return Object.keys(Errs).length === 0
     }