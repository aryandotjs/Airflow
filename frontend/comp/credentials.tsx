import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react"
import { Secondarybutton } from "./buttons/secondarybutton"
import { Add, Bin, Check, DownArrow, Edit, Locksvg, Openup, Search, UpArrow } from "./svg/allsvg"
import { MainButton, MainRedButton } from "./buttons/mainbutton"
import { Opneframe } from "./openframe"
import { OpenerButton } from "./buttons/openerButton"
import { OpenOptions } from "./openoptions"
import { Addform } from "./addform"
import { Input } from "./buttons/input"
import { OpenerBoxWithOptions } from "./OpenerBoxWithOptions"
import axios from "axios"
import { Toast } from "./toast"
import { RuntimeBadge } from "./RunTimeBadge"
import { StatusButton } from "./buttons/statusbutton"
import { SvgforActionsTriggers } from "./SvgforActionsTriggers"
import { OpenComp } from "./opencomp"

const BACKEND_URL = "http://localhost:3001";

export function Credentials(){
    const [allcreds ,setallcreds] = useState()
     
     const [credName ,setcredName] = useState("")
     const [Apikey ,setApikeys] = useState("")
     const [type ,settype] = useState("GEMINI")

     const [formopen ,setformopen] = useState(false)
     const [filter1,setfilter1] = useState("discord")

     const [toast,settoast] = useState({show:false,mess:"."})

     useEffect(()=>{
         axios.get(`${BACKEND_URL}/api/v1/credentials/all`).then((a)=>{
             setallcreds(a.data.credential)
         })
         
     },[])
    
     return <div className="flex flex-col gap-4 px-24">
            <div className="flex justify-between mt-6 items-center ">
                <div className=" text-[28px] tracking-tight  font-semibold">Credentials</div>
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
                            <input className=" outline-0 flex-2" placeholder="Search..."></input>
                        </div>
                    </Secondarybutton>
                </div>
                <div className="w-[40%]">
                     <OpenerBoxWithOptions options={["date" , "chatbot" , "emails","discord"]} simplefilter={filter1} setsimplefilter={setfilter1} ></OpenerBoxWithOptions> 
                </div>
            </div>
            <div className=" h-8">
                <Secondarybutton onclick={()=>{}} >
                    <div className="flex justify-between w-full text-xs px-4">
                        <div>Name</div>
                        <div>Token</div>
                        <div>type</div>
                        <div>updated</div>
                        <div>Created</div>
                    </div>
                </Secondarybutton>
                <div className="">
                        { allcreds ? <CredHistory settoast={settoast} allcreds={allcreds}></CredHistory> : "Loading...." }
                </div>
            </div>
            <div className={`fixed bottom-8 right-8 transition-all duration-300 ease-in-out 
                ${ toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-13 pointer-events-none" }`}>
                    <Toast>
                        <div className="flex items-center gap-2"> 
                            <div className="flex items-center justify-center rounded-full bg-black text-white  dark:bg-[#151619] h-5 w-5">
                            <Check size="13"></Check>
                            </div>
                            <div className="text-sm">{toast.mess}</div>
                        </div>   
                  </Toast>
            </div>
            {formopen ?
                 <Addform  callback={async()=>{
                     const response : any= await axios.post(`${BACKEND_URL}/api/v1/credentials/create`,{
                            name : credName,
                            apikey :Apikey ,
                            type : type
                          })
                    
                    settoast({show : true , mess:response.data.msg})
                    setformopen(false)
                    setTimeout(() => {
                        settoast({show:false,mess:""})
                    }, 2000);

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
              : ""}
     </div>
}


function CredHistory({allcreds,settoast} : {allcreds : any,settoast:Dispatch<SetStateAction<any>>}){

        const [option,setoption] = useState({open : false , id : null})
        const [updateform,setupdateform] = useState(false)
        const openmodalref = useRef<HTMLDivElement>(null)

        const [UpdateName ,setUpdateName] = useState("")
        const [UpdateApikey ,setUpdateApikeys] = useState("")
        const [Updatetype ,setUpdatetype] = useState("GEMINI")

        useEffect(()=>{
            const clickeventfunc = (a:any) => {
                if (openmodalref.current && !openmodalref.current.contains(a.target)) {
                    setoption({open : false , id : null})
                }
            }
            document.addEventListener("mousedown",clickeventfunc)
            return ()=>{
                document.removeEventListener("mousedown",clickeventfunc)
            }
        },[])

        return <div className="px-2 pr-4 ">
            {allcreds.map((z:any,index:any)=>{
                return <div key={index} className=" flex w-full items-center justify-between border-b  border-[#EEEEEE]  dark:border-[#191B1E] cursor-pointer dark:text-[#9C9FA0] text-[#404040]   tracking-normal text-xs font-semibold ">
                            <div className="flex w-full h-8 my-3 gap-5 justify-between">
                                <div className="  flex items-center gap-1 w-[20%]">
                                
                                <Svgframe status="Success">
                                    <SvgforActionsTriggers size="18" name={"Webhook"}></SvgforActionsTriggers>
                                </Svgframe>
                                <div onClick={()=>{ 
                                    // setiscardOpen(!iscardOpen)
                                    // setcardIndex(index)
                                    }} className="w-[30%]  flex items-center gap-3 underline decoration-dashed decoration-[#EEEEEE] dark:decoration-[#191B1E] hover:decoration-blue-400 dark:hover:decoration-[#EEEEEE]  underline-offset-6 transition-all duration-400">
                                    {z.name}
                                </div>
                                
                            </div>
                        
                            <div className="w-[10%]  flex items-center ">
                                <div className="bg-[#E9E9E9]  dark:bg-[#151619] py-1 px-2 rounded-lg">
                                <div className="">{z.value.slice(0,z.value.length/2)}.....</div>
                                </div>
                            </div>

                            <div className="flex justify-center items-center gap-1.5 w-[10%]">
                                <div className="text-xs">{z.type.toLowerCase()}</div>
                                <div className="h-4 w-4 hidden hover:">
                                    {z.type === "CLAUDE" ? 
                                    <img src={"./actiontriggerimages/claude.png"}></img> :
                                    z.type === "GEMINI" ? 
                                    <img src={"./actiontriggerimages/gemini.png"}></img> :
                                    z.type === "CHATGPT" ?
                                    <img src={"./actiontriggerimages/chatgpt.png"}></img>:""
                                }
                                </div>
                            </div>
                            
                            <div className="w-[10%]  flex items-center flex-row-reverse">
                                <RuntimeBadge isoString={z.updatedAt}></RuntimeBadge>
                            </div>
                            <div className="w-[10%]  flex items-center flex-row-reverse">
                                <RuntimeBadge isoString={z.createdAt}></RuntimeBadge>
                            </div>
                            {option.open}
                            {/* <div onClick={()=>setoption({open : !option.open , id :index })} className="relative hover:bg-[#E9E9E9]  hover:dark:bg-[#151619] h-8 w-8  rounded-xl  flex justify-center  transition duration-150"> */}
                            <div onClick={()=>setoption({open : true , id :index })} className="relative select-none hover:bg-[#E9E9E9]  hover:dark:bg-[#151619] h-8 w-8  rounded-xl  flex justify-center  transition duration-150">
                                <div className="leading-0 mt-3">
                                ...
                                </div>
                                { option.open && index == option.id? 
                                <div ref={openmodalref}  className="absolute w-40 top-11 z-10 right-0 ">
                                    <Opneframe>
                                            <div  className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                                <div onClick={()=> {
                                                    setupdateform(true)
                                                    setUpdateName(z.name)
                                                    setUpdateApikeys(z.value)
                                                    setUpdatetype(z.type)
                                                }} className="m-1 ">
                                                    <MainButton name="Edit credential">
                                                        <Edit size="17"></Edit>
                                                    </MainButton>
                                                </div>
                                            </div>
                                            <div className="border-t border-[#C6C6C6] dark:border-[#2C3034]"></div>
                                            <div  className=" border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
                                                <div onClick={()=>{}} className="m-1 ">
                                                    <MainRedButton name="Delete credential">
                                                        <Bin size="17"></Bin>
                                                    </MainRedButton>
                                                </div>
                                            </div>
                                    </Opneframe>
                                </div> : ""}
                                <div>
                                { updateform ?
                                    <Addform  callback={async()=>{
                                        const response : any= await axios.post(`${BACKEND_URL}/api/v1/credentials/update`,{
                                                name : UpdateName,
                                                apikey :UpdateApikey ,
                                                type : Updatetype,
                                                credid : z.id
                                            })
                                            settoast({show : true , mess:response.data.msg})
                                            setupdateform(false)
                                            setTimeout(() => {
                                                settoast({show:false,mess:""})
                                            }, 2000);

                                    }} name={"Add credentials"} buttonname={"Update"} formopen={updateform} setformopen={setupdateform}>
                                        
                                        <div className="my-6 flex flex-col gap-4 w-115">
                                            <Input placeholder="Credentials Name" name="Name" state={UpdateName}  statesetter={setUpdateName}></Input>
                                                <div className="w-40 flex flex-col gap-2 text-sm font-medium">
                                                    <div className="">Type</div>
                                                    <OpenerBoxWithOptions options={["CHATGPT" , "GEMINI","CLAUDE"]} simplefilter={Updatetype} setsimplefilter={setUpdatetype} ></OpenerBoxWithOptions> 
                                                </div>
                                            <Input placeholder="mI2DyWosumKcWdkDg0GI592C0wGSUZoF" name="API Key" state={UpdateApikey} statesetter={setUpdateApikeys}></Input>
                                        </div>

                                    </Addform> : ""
                                }
                            </div>
                            </div>
                            
                            </div>
                            
                    
                    
                </div>
            })}
        
        </div>
}



export function formatRelativeTime(backendTime: string | number): string {
  const start = new Date(backendTime).getTime();
  const now = Date.now();
  const diffInSeconds = Math.floor((now - start) / 1000);

  if (diffInSeconds < 60) return "just now";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return new Date(backendTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
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


