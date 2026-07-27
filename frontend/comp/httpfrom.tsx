import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "./buttons/input"
import { BigInput } from "./biggerinput"
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative"
import { Secondarybutton } from "./buttons/secondarybutton"
import { Cross } from "./svg/allsvg"
import { OpenerButton } from "./buttons/openerButton"
import { MainButton } from "./buttons/mainbutton"
import { OpenOptions } from "./openoptions"
import { Opneframe } from "./openframe"
export function HttpForm({
    nodes,
    setNodes,
  setformDetail,
  formDetail,
}: {
     nodes:any,
    setNodes:any,
  setformDetail: Dispatch<SetStateAction<any>>;
  formDetail: any;
}) {

     
    const initialValue = {variableName:"",Method:"GET",Endpoint:"",RequestBody:{}}
    const [open,setopen] = useState<any>(false) 

    const [formdata,setformdata] = useState<{variableName:string,Method:string,Endpoint:string,RequestBody:Record<string,any>}>(initialValue)
        useEffect(()=>{
            if (nodes.length > 0) {
                const selectednodemetadata = nodes.filter((a:any)=>{ return a.id === formDetail.nodeid})[0]?.data.metadata
                if(selectednodemetadata){
                    setformdata({...initialValue , ...selectednodemetadata})
                }else{
                    setformdata(initialValue)
                }
            }
        },[formDetail.nodeid,nodes.length])


  return (<div className={` transition duration-300 ease-initial ${formDetail.name == "HTTP-request" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div className={` transition duration-300 ${formDetail.name == "HTTP-request"?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name}</div>
                     <div onClick={()=>{
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
                     }} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                       <div className="my-6 flex flex-col gap-6 w-115 overflow-y-scroll max-h-100 p-2 ">
                            <div>
                                <Input placeholder={`Variable-name`} name="Variable Name (optional)" state={formdata.variableName} statesetter={(a)=>{
                                     setformdata((prev:any)=>{
                                         return {...prev , variableName : a }
                                     })
                                }}></Input>
                                <div className="mt-1 text-xs">{`Name of the variable to store the response :{{variableName.httpResponse.data}}`}</div>
                            </div>
                            <div className="w-full flex flex-col gap-1 text-sm font-medium">
                                                        <div className="">{`Method`}</div>
                                                        <div className="w-full relative z-10 " >
                                                                    <OpenerButton simplefilter={formdata.Method} open={open} setopen={setopen}></OpenerButton>
                                                                    <div className={`absolute w-full top-7 transition duration-150 ${open ? "opacity-100 translate-y-3" : "translate-y-0 opacity-0 pointer-events-none ease-in-out"}`}>
                                                                        <OpenOptions simplefilter={""} options={["GET","POST","PUT","DELETE"]}  open={open} setopen={setopen} setsimplefilter={(a)=>{setformdata((prev:any)=>{return {...prev , Method :a}})}}>
                                                                                <Opneframe>
                                                                                        {["GET","POST","PUT","DELETE"].map((z:any,index)=>{
                                                                                            return <div 
                                                                                                key={index}
                                                                                                onClick={()=>{
                                                                                                    setformdata((prev:any)=>{return {...prev , Method : z}})
                                                                                                    setopen(false)
                                                                                                }}
                                                                                                className="m-1.5 ">
                                                                                                <MainButton>
                                                                                                    <div className="flex gap-2 font-normal ">
                                                                                                        <div className="text-xs">{z.name}</div>
                                                                                                    </div>
                                                                                                </MainButton>
                                                                                            </div>
                                                                                        })}
                                                                                </Opneframe>
                                                                        </OpenOptions>
                                                                    </div>
                                                                </div>
                                                    </div>
                            <div>
                                <Input placeholder={`https://example.com/users/{{httpResponse.data.id}}`} name="Endpoint" state={formdata.Endpoint} statesetter={(a)=>{
                                     setformdata((prev:any)=>{
                                         return {...prev , Endpoint : a }
                                     })
                                }}></Input>
                                <div className="mt-1 text-xs">{`Static URL or use {{variables}}for simple values or {{json variables}} to stringfy objects`}</div>
                            </div>
                            {formdata.Method === "POST" || formdata.Method === "PUT" ?
                            <div>
                                <BigInput 
                                      placeholder={"{\n    user Id: {{httpResponse.data.id}},\n    name: {{httpResponse.data.name}},\n    items: {{httpResponse.data.items}}\n}"} 
                                     name="RequestBody" state={formdata.RequestBody} statesetter={(a)=>{setformdata((prev:any)=>{return {...prev , RequestBody :a}})}}></BigInput> 
                                <div className=" text-xs">{"Enter JSON body or use {{variables}} for simple values or {{json variables}} to stringify objects"}</div>
                            </div>
                            : ""}
                         </div> 
                <div  className="flex gap-2 w-full">
                    <div onClick={()=>{
                        setNodes((prev:any)=>{
                                return prev.map((n:any)=>{
                                    if (n.id === formDetail.nodeid) {
                                        return { ...n , data : { ...n.data , metadata : formdata }}
                                    }
                                    return n ;
                                })
                        })
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
                    }} className="h-8 w-30 transition-all duration-150 active:scale-95">
                        <SecondarybuttonNegative>
                            <div className=" px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                Save
                            </div>
                        </SecondarybuttonNegative>
                    </div>
                    <div onClick={()=>{
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
                    }} className="h-8 w-30 transition-all duration-150 active:scale-95 ">
                        <Secondarybutton>
                            <div className=" px-1  text-sm pb-0.5">
                                Cancle
                            </div>
                        </Secondarybutton>
                    </div>
                </div>
              </div>
        </div>
     </div>
   


  );
}