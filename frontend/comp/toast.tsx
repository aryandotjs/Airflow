import { Dispatch, ReactNode, SetStateAction } from "react";
import { Opneframe } from "./openframe";
import { Canclesolid, Checksolid, Cross } from "./svg/allsvg";

export function Toast({settoast,toast}:{toast:any,settoast:Dispatch<SetStateAction<any>>}){
   console.log(toast.show)
     return <div className={`z-50 transition-all duration-300 w-full flex  border  rounded-xl bg-linear-to-r overflow-hidden
        ${toast.isError ? " dark:border-[#641822] border-[#FCC2C2] dark:from-[#2D040B]  dark:from-10% dark:to-black dark:to-70%  from-[#FCE9EA] from-10% to-brand-bg to-70% " : "from-[#E4F4E9] from-10% to-brand-bg to-70%  dark:from-[#041E12] dark:from-10% dark:to-black dark:to-70%  dark:border-[#144A31] border-[#ACDCBF] "}
       ${toast.show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
     `}> 
         <div className={`h-full w-[16%] flex   mt-4 justify-center `} >
            <div>

               { !toast.isError ?
               <div className="dark:text-[#A8E7A6] text-[#A8E7A6]">
                  <Checksolid size="20"></Checksolid>
               </div> :
               <div className="dark:text-[#D25252] text-[#D25252]">
                  <Canclesolid size="20"></Canclesolid>
               </div>}
            </div>
         </div>

         <div className=" h-full w-full flex flex-col gap-1  py-4">
            <div  className="dark:text-brand-bg font-medium tracking-tight text-sm  text-brand-dark-bg">{toast.message}</div>
            {toast.isbig? 
            <div className="dark:text-[#8E9091] dark:font-medium tracking-tight text-sm text-[#414040]">{toast.submessage}</div> : "" }
         </div>
         <div
         onClick={()=>{
            settoast((prev:any) =>
               prev.map((t:any) => t.id === toast.id ? { ...t, show: false }: t )
            );
            setTimeout(() => {
               settoast((prev:any)=> prev.filter((a:any)=>{ 
                  console.log(toast.id , a.id)
                  return toast.id !== a.id}))
            }, 300);
         }}
          className=" w-[16%] h-full flex justify-center  mt-4">
            {toast.isbig? 
           <div onClick={()=>{}} className="pointer-events-auto  h-5 w-5 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="14"></Cross></div>
            : ""}
         </div>
         
     </div>
     
}

 