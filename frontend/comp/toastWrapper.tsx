"use client"
import { Toast } from "./toast"
import { useToast } from "./toastprovider"



export function ToastWrapper(){
    const { toasts , setToasts } = useToast()
    
    return  <div className="fixed bottom-6 right-6 w-90 h-full z-20 flex flex-col-reverse gap-4 pointer-events-none  ">
            {toasts.map((toast,index)=>(
                  <Toast key={toast.id} settoast={setToasts} toast={toast}></Toast>
            ))}
         </div> 
}