import Navbar from "@/comp/navbar";
import { Sidebar } from "@/comp/sidebar";


export default function DashboardLayout({children}:{children : React.ReactNode}){
   return <div className="w-full ">
            <div >
               <Navbar></Navbar>
            </div>
            <div className="overflow-y-scroll">
               {children}
            </div>
      </div>
}