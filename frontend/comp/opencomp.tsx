import { useRouter } from "next/navigation";
import { MainButton } from "./buttons/mainbutton";
import { Opneframe } from "./openframe";
import { Locksvg, Logout } from "./svg/allsvg";


export function OpenComp(){
  const router = useRouter()
    return <div className=" w-full max-w-53.5">

     <Opneframe>
         <div  className="border-b border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
            <div onClick={()=>{
                localStorage.removeItem("token")
                router.replace("/login")
              }} className="m-1">
                <div  className={`transition duration-100 ease-in-out flex justify-center  cursor-pointer hover:bg-[#E9E9E9] dark:hover:text-[#F0F0F0] dark:hover:bg-[#151619] rounded-xl text-center flex-col font-medium  text-sm h-8 w-full  bg-[#E9E9E9] dark:bg-[#151619]`}>
                      <div className={`flex w-full gap-1.5 p-1 lg:pl-3 items-center `}>
                        <Logout size="16"></Logout>
                         <div className="hidden lg:block">
                            {"Logout"}
                          </div>
                          
                      </div>
                </div>
            </div>
         </div>
        </Opneframe>
    
    </div>
}