"use client"
import { Appbar } from "@/comp/Appbar";
import axios from "axios"
import { useEffect, useState } from "react"

const BACKEND_URL = "http://localhost:3001";
 
export default function(){
    const [zapruns,setzapruns] = useState()
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/zap/all`,{
            headers : {
                "authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        }).then((a)=>{
               setzapruns(a.data.zaps)
        })
    },[])
    if (!zapruns) {
        return <div>
                loading...
        </div>
    }
    return <div>
        <Appbar/>
        <div className="px-50">
           <div className="text-4xl font-semibold m-5">History </div>
          <History zapruns={zapruns}></History>
        </div>
    </div>
}

function History({zapruns} :any){
    console.log(zapruns.length)
     return <div>
        {zapruns.map((z:any,index:any)=>{
            return <div key={index} className=" flex items-center justify-between border mt-3 border-black p-2 hover:bg-slate-50">
            <div className="  flex items-center gap-3  ">
                <div className={`${!z.zapRunOutBox ? "bg-green-500" : "bg-red-500"} h-4 w-4 rounded-full `}></div>
                <div>{`${!z.zapRunOutBox ? "succces" : "failed"} `}</div>
                <div className="text-xs">{z.id}</div>
            </div>
            <div className="  flex items-center gap-3">
                 <img src={z.type.trigger.type.image} className="w-[30px] h-[30px]"></img>
                 <div> {'->'} </div>
                 {z.type.actions.map((a:any,b:any)=>{
                    return <img key={b} src={a.type.image} className="w-[30px] h-[30px]"></img>
                 })}
            </div>
            <div className="  flex items-center gap-3">
                 <div>{JSON.stringify(z.metadata)}</div>
            </div>
         </div>
        })}
         
     </div>
}