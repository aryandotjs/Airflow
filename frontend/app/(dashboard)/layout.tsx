import Navbar from "@/comp/navbar";
import { Sidebar } from "@/comp/sidebar";
import { Toast } from "@/comp/toast";
import { ToastWrapper } from "@/comp/toastWrapper";


export default function DashboardLayout({children}:{children : React.ReactNode}){
   return  <div className="flex h-screen overflow-hidden">
         <div className="">
            <Sidebar></Sidebar>
         </div>
         <div className="w-full ">
           {children}
         </div>
        <ToastWrapper></ToastWrapper>
      </div>
}