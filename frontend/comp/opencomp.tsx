import { MainButton } from "./buttons/mainbutton";
import { Opneframe } from "./openframe";
import { Locksvg, Logout } from "./svg/allsvg";


export function OpenComp(){
    return <div className=" w-full max-w-53.5">

     <Opneframe>
         <div  className="border-b border-[#C6C6C6] dark:border-[#2C3034] overflow-hidden">
            
            <div className="m-1 ">
              <MainButton name="Log out">
                <Logout size="16"></Logout>
              </MainButton>
            </div>
         </div>
        </Opneframe>
    
    </div>
}