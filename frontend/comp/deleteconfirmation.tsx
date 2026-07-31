import { ReactNode, useState } from "react";
import { Addform } from "./addform";
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative";
import { Secondarybutton } from "./buttons/secondarybutton";

export function DeleteConfirm({formopen,setformopen,name,buttonname,callback,children}:any){
    return <div className="bg-red-300">
        <Addform manualbutton={true} callback={async()=>{
                    //  try{
                    //       if (!credName.length || !Apikey.length) {
                    //         setformopen(false)
                    //         return ;
                    //       }
                    //       const response : any= await axios.post(`${BACKEND_URL}/api/v1/credentials/create`,{
                    //             name : credName,
                    //             apikey :Apikey ,
                    //             type : type
                    //       })
                    //         setformopen(false)
                    //         setRefreshTrigger((prev)=>!prev)
                    //         showToast({msg :response.data.msg,isError:false})
                    //     }catch(err:any){
                    //         setformopen(false)
                    //         showToast({msg : err.response?.data?.err ?? "Something went wrong",isError:true})
                    //     }

                 }}  name={name} formopen={formopen} buttonname="Add" setformopen={setformopen}>
                    {children}
                    <div className="my-7 min-w-100">
                        <div className="text-sm ">Are you sure you want to delete this API Key?</div>
                        <div className="text-sm font-medium text-[#CE292E] dark:text-[#FF9592]">This can not be undone.</div>
                    </div>
                    <div  className="flex gap-2 w-full">
                        <div onClick={()=>{
                            callback()
                            setformopen(false)
                        }} className="h-8 min-w-30 transition-all duration-150 active:scale-95">
                            <Deletebutton name={buttonname}>
                            </Deletebutton>
                        </div>
                        <div onClick={()=>{setformopen(!open)}} className="h-8 w-30 transition-all duration-150 active:scale-95 ">
                            <Secondarybutton>
                                <div className=" px-1  text-sm pb-0.5">
                                    Cancle
                                </div>
                            </Secondarybutton>
                        </div>
                    </div>
        </Addform>
    </div>
}

export function Deletebutton({onclick , name , className } : { onclick? : ()=> void  , name?:string , className?:string}){
     return <div onClick={onclick} className={`border  dark:border-[#2D040B] h-full border-[#FCE9EA] flex justify-center  cursor-pointer text-[#DC686C] bg-[#FCE9EA] dark:text-[#FF9592] dark:bg-[#2D040B] rounded-xl text-center px-2.5 flex-col tracking-normal text-sm font-medium ${className}`}>
      <div className="flex w-full gap-2 items-center">
          {name} 
      </div>
     </div>
} 