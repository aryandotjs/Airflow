"use client"
import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import { Secondarybutton } from "./buttons/secondarybutton"
import { Add, Bin, Check, DownArrow, Edit, Locksvg, Openup, Search, UpArrow } from "./svg/allsvg"
import { MainButton, MainRedButton } from "./buttons/mainbutton"
import { Opneframe } from "./openframe"
import { Addform } from "./addform"
import { Input } from "./buttons/input"
import { OpenerBoxWithOptions } from "./OpenerBoxWithOptions"
import axios from "axios"
import { DateConverter } from "./RunTimeBadge"
import { SvgforActionsTriggers } from "./SvgforActionsTriggers"
import Spin from "./buttons/spinningwheel"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function Credentials(){
     const [refreshTrigger, setRefreshTrigger] = useState(false);
     const [allcreds ,setallcreds] = useState()
     
     const [credName ,setcredName] = useState("")
     const [Apikey ,setApikeys] = useState("")
     const [type ,settype] = useState("ALL")


     const [formopen ,setformopen] = useState(false)

     const [filter1,setfilter1] = useState("ALL")
     const [search,setsearch] = useState("")

     useEffect(()=>{
         axios.get(`${BACKEND_URL}/api/v1/credentials/all`).then((a)=>{
             setallcreds(a.data.credential.sort((a:any,b:any)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
         })
     },[refreshTrigger])
     
     const filteredCreds = useMemo(()=>{
          return (allcreds ?? []).filter((a:any)=>{
              const MatchFilter = filter1 == "ALL" || a.type === filter1 
              const MatchSearch = a.name.toLowerCase().includes(search.toLowerCase())
              return MatchSearch && MatchFilter
           })
     },[allcreds,search,filter1])
       
        return <div className={`flex flex-col gap-4 px-24 h-screen`}>
            <div className="flex justify-between mt-6 items-center ">
                <div className=" text-[28px] tracking-tight  font-semibold  dark:text-brand-bg text-brand-dark-bg">Credentials</div>
                <div onClick={()=>{setformopen(!formopen)}} className=" flex transition-all duration-150 active:scale-95   font-semibold rounded-xl justify-center text-sm  px-2.5 h-7.5 gap-1.5 cursor-default items-center bg-brand-dark-bg text-brand-bg dark:bg-brand-bg  dark:text-brand-dark-bg">
                    <Add size="18"></Add>
                    <div>Add Credentials</div>
                </div>
            </div>
            <div className="flex justify-between mt-5 items-center gap-2">
                <div className="h-8 w-[60%]">
                    <Secondarybutton onclick={()=>{}}>
                        <div className="flex h-full items-center gap-2 w-full">
                            <Search size="16"></Search>
                            <input className=" outline-0 flex-2" value={search} onChange={(a)=> setsearch(a.target.value)} placeholder="Search..."></input>
                        </div>
                    </Secondarybutton>
                </div>
                <div className="w-[40%]">
                     <OpenerBoxWithOptions options={["ALL" , "GEMINI" , "CHATGPT","CLAUDE"]} simplefilter={filter1} setsimplefilter={setfilter1} ></OpenerBoxWithOptions> 
                </div>
            </div>
            <div className=" h-8">
                <Secondarybutton onclick={()=>{}} >
                    <div className="flex  w-full text-xs px-1">
                        <div className="w-[30%] flex justify-start">Name</div>
                        <div className="w-[15%] flex justify-start">Token</div>
                        <div className="w-[14%] flex justify-start pl-6">type</div>
                        <div className="w-[13%] flex justify-start">Total uses</div>
                        <div className="w-[13%] flex justify-start">Last used</div>
                        <div className="w-[13%] flex justify-start">
                            <div>updated</div> /<div>Created</div>
                        </div>
                        <div className=""></div>
                    </div>
                </Secondarybutton>
                    {!allcreds ? 
                        <div className="bg-brand-bg dark:bg-brand-dark-bg  w-full flex justify-center mt-40 ">
                            <Spin></Spin>
                        </div> :
                        <CredHistory setRefreshTrigger={setRefreshTrigger} filteredCreds={filteredCreds}></CredHistory> 
                    }
            </div>
            
                 <Addform  callback={async()=>{
                     try{
                          const response : any= await axios.post(`${BACKEND_URL}/api/v1/credentials/create`,{
                                name : credName,
                                apikey :Apikey ,
                                type : type
                          })
                            setformopen(false)
                            setRefreshTrigger((prev)=>!prev)
                            // toastsetterremover(settoasts,{msg :response.data.msg,isError:false})
                        }catch(err:any){
                            setformopen(false)
                            // toastsetterremover(settoasts,{msg : err.response?.data?.err ?? "Something went wrong",isError:true})
                        }

                 }}  name={"Add credentials"} formopen={formopen} buttonname="Add" setformopen={setformopen}>
                    <div className="my-6 flex flex-col gap-4 w-115">
                           <Input placeholder="Credentials Name" name="Name" state={credName} statesetter={setcredName}></Input>
                           <div className="w-40 flex flex-col gap-2 text-sm font-medium">
                               <div className="">Type</div>
                            <OpenerBoxWithOptions options={["CHATGPT" , "GEMINI","CLAUDE"]} simplefilter={type} setsimplefilter={settype} ></OpenerBoxWithOptions> 
                           </div>
                           <Input placeholder="mI2DyWosumKcWdkDg0GI592C0wGSUZoF" name="API Key" state={Apikey} statesetter={setApikeys}></Input>
                    </div>
                </Addform>
     </div>
     }
     


function CredHistory({filteredCreds,setRefreshTrigger} : {setRefreshTrigger:Dispatch<SetStateAction<boolean>>,filteredCreds : any}){

        const [option,setoption] = useState({open : false , id : null})
        const [updateform,setupdateform] = useState(false)
        const openmodalref = useRef<HTMLDivElement>(null)

        const [UpdateName ,setUpdateName] = useState("")
        const [UpdateApikey ,setUpdateApikeys] = useState("")
        const [Updatetype ,setUpdatetype] = useState("GEMINI")
        const [crediddb ,setcrediddb] = useState("")


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

        return <div className="px-2 pr-4 ">
            {filteredCreds.map((z:any,index:any)=>{
                console.log(z)
                return <div key={index} className="relative flex w-full items-center justify-between border-b  border-[#EEEEEE]  dark:border-[#191B1E] cursor-pointer dark:text-[#9C9FA0] text-[#404040]   tracking-normal text-xs font-semibold ">
                        <div className="flex w-full h-8 my-3 gap-2 ">
                            <div className="  flex items-center  gap-3 w-[30%] overflow-hidden">
                                
                                <Svgframe status="Success">
                                    <SvgforActionsTriggers size="18" name={"Lock"}></SvgforActionsTriggers>
                                </Svgframe>
                                
                                <div onClick={()=>{ 
                                   
                                    }} className="w-[30%]  flex items-center gap-3 font-normal underline decoration-dashed decoration-[#EEEEEE] dark:decoration-[#191B1E] hover:decoration-blue-400 dark:hover:decoration-[#EEEEEE]  underline-offset-6 transition-all duration-400 text-xs dark:font-medium dark:text-[#F0F0F0] text-[#191919]">
                                    {z.name}
                                </div>
                                
                            </div>
                        
                            <div className="w-[15%] flex justify-start pl-3  items-center overflow-hidden">
                                <div className="bg-[#E9E9E9]  dark:bg-[#151619] py-0.5 px-2 rounded-lg">
                                <div className="">{z.value.apikey.slice(0,10)}.....</div>
                                </div>
                            </div>

                            <div className="flex justify-center items-center gap-1.5 w-[15%] font-normal text-sm dark:font-medium dark:text-[#F0F0F0] text-[#191919]">
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
                            <div className="flex justify-center items-center  w-[13%] text-xs font-normal dark:font-medium dark:text-[#F0F0F0] text-brand-dark-bg">0</div>
                            <div className="flex justify-center items-center  w-[13%] text-xs font-normal dark:font-medium dark:text-[#F0F0F0] text-brand-dark-bg">No Activity</div>
                            <div className="w-[13%]  flex items-center justify-center text-xs font-normal dark:font-medium dark:text-[#F0F0F0] text-brand-dark-bg">
                                <DateConverter isoString={z.updatedAt}></DateConverter>/
                                <DateConverter isoString={z.createdAt}></DateConverter>
                            </div>
                            <div ref={option.open &&  option.id === index ? openmodalref : null} className="w-[5%]  flex items-center justify-end">
                                <div 
                                    onClick={(a)=>{
                                        setoption({open:!option.open , id : index})
                                        setcrediddb(z.id)
                                    }}
                                    className=" select-none hover:bg-[#E9E9E9] pt-1 hover:dark:bg-[#151619] h-8 w-8  rounded-xl  flex justify-center  ">
                                    ...
                                </div>
                                    <div className={`absolute  w-45 top-11 z-10 right-0 transition duration-100 ${ option.open && index == option.id ?  "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>

                                    <Opneframe>
                                            <div onClick={()=>{}} className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                                <div onClick={()=> {
                                                    setUpdateName(z.name)
                                                    setUpdateApikeys(z.value.apikey)
                                                    setUpdatetype(z.type)
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
                                                        const response = await axios.delete(`${BACKEND_URL}/api/v1/credentials/delete`,{
                                                            data : {
                                                                apiId : z.id
                                                            }
                                                            })
                                                        setoption({open:false , id : null})
                                                        setRefreshTrigger((prev)=>!prev)
                                                        // toastsetterremover(settoasts,{msg :response.data.msg,isError:false})
                                                    }catch(err:any){
                                                        setoption({open:false , id : null})
                                                        // toastsetterremover(settoasts,{msg : err.response?.data?.err ?? "Something went wrong",isError:true})
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
            

                    <Addform  callback={async()=>{
                        try{
                             const response : any= await axios.post(`${BACKEND_URL}/api/v1/credentials/update`,{
                                name : UpdateName,
                                apikey :UpdateApikey ,
                                type : Updatetype,
                                credid : crediddb
                            })
                            setupdateform(false)
                            setRefreshTrigger((prev)=>!prev)
                            // toastsetterremover(settoasts,{msg :response.data.msg,isError:false})
                        }catch(err:any){
                            setupdateform(false)
                            // toastsetterremover(settoasts,{msg : err.response?.data?.err ?? "Something went wrong",isError:true})
                        }
                            
                    }} name={"Add credentials"} buttonname={"Update"} formopen={updateform} setformopen={setupdateform}>
                        
                        <div className="my-6 flex flex-col gap-4 w-115">
                            <Input placeholder="Credentials Name" name="Name" state={UpdateName}  statesetter={setUpdateName}></Input>
                                <div className="w-40 flex flex-col gap-2 text-sm font-medium">
                                    <div className="">Type</div>
                                    <OpenerBoxWithOptions options={["CHATGPT" , "GEMINI","CLAUDE"]} simplefilter={Updatetype} setsimplefilter={setUpdatetype} ></OpenerBoxWithOptions> 
                                </div>
                            <Input placeholder="mI2DyWosumKcWdkDg0GI592C0wGSUZoF" name="API Key" state={UpdateApikey} statesetter={setUpdateApikeys}></Input>
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



