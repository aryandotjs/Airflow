import Navbar from "@/comp/navbar";
import { Sidebar } from "@/comp/sidebar";


export default function DashboardLayout({children}:{children : React.ReactNode}){
   return <div className="flex h-screen overflow-hidden">
         <div className="">
            <Sidebar></Sidebar>
         </div>
         <div className="w-full">
            <div >
               <Navbar></Navbar>
            </div>
            <div>
               {children}
            </div>
         </div>
      </div>
}