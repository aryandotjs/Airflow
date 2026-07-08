import { Dispatch, ReactNode, SetStateAction } from "react";
import { Opneframe } from "./openframe";
import { Canclesolid, Checksolid, Cross } from "./svg/allsvg";

export function Toast({settoast,toast}:{toast:any,settoast:Dispatch<SetStateAction<any>>}){
   console.log(toast.show)
     return <div className={`transition-all duration-300 w-full flex items-center border py-4 justify-between rounded-xl bg-linear-to-r overflow-hidden
        ${toast.isError ? " dark:border-[#641822] from-[#2D040B]  from-10% to-black to-70% border-[#2C3034]" : "from-[#041E12] from-10% to-black to-70%  dark:border-[#144A31] border-[#2C3034]"}
       ${toast.show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
     `}> 
         <div className=" h-full w-[16%]">
            <div className="  flex justify-center">
               { !toast.isError ?
               <div className="dark:text-[#A8E7A6]">
                  <Checksolid size="20"></Checksolid>
               </div> :
               <div className="dark:text-[#D25252]">
                  <Canclesolid size="20"></Canclesolid>
               </div>}
            </div>
         </div>

         <div className=" h-full w-full flex flex-col gap-1">
            <div  className="dark:text-brand-bg dark:font-medium tracking-tight text-sm">{toast.message}</div>
            {toast.isbig? 
            <div className="text-[#8E9091] dark:font-medium tracking-tight text-sm">{toast.submessage}</div> : "" }
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
          className=" w-[16%] h-full flex justify-center ">
            {toast.isbig? 
           <div onClick={()=>{}} className="pointer-events-auto  h-5 w-5 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="14"></Cross></div>
            : ""}
         </div>
         
     </div>
     
     
     
     
   //   <div className=" w-full flex items-center px-3 border  border-[#C6C6C6] dark:border-[#2C3034] rounded-xl h-25  bg-brand-bg dark:bg-brand-dark-bg overflow-hidden ">
   //      {children}
   //   </div>
}

  {/* <div className={` transition-all bg-red-50 duration-300 ease-in-out 
                ${ toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-13 pointer-events-none" }`}>
                    <Toast>
                        <div className="flex items-center gap-2"> 
                            <div className="flex items-center justify-center rounded-full bg-black text-white  dark:bg-[#151619] h-5 w-5">
                            <Check size="13"></Check>
                            </div>
                            <div className="text-sm">{toast.mess}</div>
                        </div>   
                    </Toast>
            </div> */}