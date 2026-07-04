"use client"
import { useRouter } from "next/navigation";
// import { LinkButton } from "./buttons/linkbutton";
import { MainButton } from "./buttons/mainbutton";
import { sign } from "crypto";
import { ThemeProvider } from "./theme-provider";



export function Appbar(){
    const router = useRouter()
    return <div className="flex border-b  border-slate-200 justify-between p-4">
         <div className="flex  justify-center text-2xl font-bold">
            <div className="ml-6">
                Flowgram
            </div>    
            <div className="bg-[#ff4f00] h-1 w-2"></div>
            <div className="bg-[#ff4f00] h-2 w-2"></div>
        </div>
         <div className="flex gap-4">
             <ThemeProvider></ThemeProvider>
             {/* <LinkButton  onclick={()=> {} }>Contact Sales</LinkButton>
             <LinkButton  onclick={()=> router.push("/signin") }>Login</LinkButton> */}
             {/* <MainButton  onclick={()=> router.push("/signup") }>Signup</MainButton> */}
         </div>
    </div>
}