import { Appbar } from "@/comp/Appbar";
import { DarkButton } from "@/comp/buttons/darkbutton";
import { MainButton } from "@/comp/buttons/mainbutton";
import { Namebox } from "@/comp/buttons/namebox";
import { Secondarybutton } from "@/comp/buttons/secondarybutton";
import { DiscordConfigPanel } from "@/comp/discord";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Add, Adjust, Search } from "./svg/allsvg";
import { OpenerBoxWithOptions } from "./OpenerBoxWithOptions";
import { Svgframe } from "./executions";
import { SvgforActionsTriggers } from "./SvgforActionsTriggers";
import { RuntimeBadge } from "./RunTimeBadge";
import { StatusButton } from "./buttons/statusbutton";
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



function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false)
            })
    }, []);

    return {
        loading, zaps
    }
}

export function Workflows({setcard}:{setcard:Dispatch<SetStateAction<string>>}){
    const { loading, zaps } = useZaps();
    const [filter1,setfilter1] = useState("pending")

    const router = useRouter();
    return <div className="flex flex-col gap-4 px-24">
                    <div className="flex justify-between mt-6 items-center ">
                        <div className=" text-[28px] tracking-tight  font-semibold text-[#191919] dark:text-[#F0F0F0] ">Automations</div>
                    </div>
                    <div className="flex flex-row-reverse gap-3">
                        <div onClick={()=> setcard("Create")} className="w-43 flex  transition-all duration-150 active:scale-95   font-semibold rounded-xl justify-center text-sm  px-2.5 h-7.5 gap-1.5 cursor-default items-center bg-brand-dark-bg text-brand-bg dark:bg-brand-bg  dark:text-brand-dark-bg">
                            <Add size="18"></Add>
                            <div>Create Automation</div>
                            
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 items-center gap-2">
                        <div className="h-8 w-[80%]">
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
                        {loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>} 
                    </div>
             </div>

}



function ZapTable({ zaps }: {zaps: Zap[]}) {
    const router = useRouter();

    return <div className=" w-full">
        {zaps.map((z,b) => 
          <div key={b} className="py-3 px-3 flex w-full items-center justify-between border-b  border-[#EEEEEE]  dark:border-[#191B1E] cursor-pointer dark:text-[#9C9FA0] text-[#404040]   tracking-normal text-xs font-semibold">
            <div className="w-[25%] flex-1 flex  gap-4">
                <Svgframe status="Disabled">
                        <SvgforActionsTriggers size="18" name={"Workflow"}></SvgforActionsTriggers>
                </Svgframe>
                <div className="dark:text-[#F0F0F0] text-[#191919]  flex items-center gap-3 underline decoration-dashed decoration-[#EEEEEE] dark:decoration-[#191B1E] hover:decoration-blue-400 dark:hover:decoration-[#EEEEEE]  underline-offset-6 transition-all duration-400 text-sm font-normal dark:font-semibold">
                      Untititled Workflow
                </div>
            </div>

            <div className="w-[25%] flex justify-center">{z.id}</div>

            <div className="w-[20%]  flex justify-center ">
                <StatusButton status={"Disabled"}></StatusButton>
            </div>

            <div className="w-[15%] flex justify-center">5</div>

             <div className="w-[15%] flex justify-center flex-row-reverse">
                         <RuntimeBadge isoString={"1780922371720"}></RuntimeBadge>
            </div>
            
        </div>)}
    </div>

}
