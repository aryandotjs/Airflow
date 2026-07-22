import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "./buttons/input"
import { BigInput } from "./biggerinput"
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative"
import { Secondarybutton } from "./buttons/secondarybutton"
import { Cross } from "./svg/allsvg"

export function GoogleFormTriggerForm({
     nodes,
    setNodes,
    setformDetail,
    formDetail
}: {
     nodes:any,
    setNodes:any,
    setformDetail: Dispatch<SetStateAction<any>>;
    formDetail: any;
}) {
    const initialValue = {variableName:"",formId:""}
    const [formdata,setformdata] = useState<{variableName:string,formId:string}>(initialValue)
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





    // const [credName, setcredName] = useState("");
    // const [formId, setformId] = useState("");


    return (<div className={` transition duration-300 ease-in-out ${formDetail.name == "google-forms" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div className={` transition duration-300 ${formDetail.name == "google-forms" ?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name}</div>
                     <div onClick={()=>{
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
                     }} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                  <div className="my-6 flex flex-col gap-4 w-115 overflow-y-scroll h-100 p-2">


                <div>

                    <Input
                        placeholder="my-google-form-variable"
                        name="Variable Name"
                        state={formdata.variableName}
                        statesetter={(a)=>{
                            setformdata((prev:any)=>{
                                 return { ...prev , variableName : a}
                            })
                        }}
                    />

                    <div className="mt-1 text-xs">
                        Name of the variable to store the response:
                        {" {{googleForm.responses}}"}
                    </div>

                </div>



                <div>

                    <Input
                        placeholder="Google Form ID"
                        name="Form ID"
                        state={formdata.formId}
                        statesetter={(a)=>{
                            setformdata((prev:any)=>{
                                 return { ...prev ,formId : a}
                            })
                        }}
                    />

                    <div className="mt-1 text-xs">
                        ID of the Google Form that will trigger this workflow.
                    </div>

                </div>



                <div className="text-sm font-medium">

                    Trigger Event

                    <div className="mt-2 p-3 border rounded text-xs">

                        When a response is submitted

                    </div>


                    <div className="mt-1 text-xs font-normal">
                        This workflow will start whenever someone submits the form.
                    </div>

                </div>




                <div className="text-xs mt-2">

                    <div className="font-medium mb-2">
                        Available Variables
                    </div>


                    <div className="flex flex-col gap-1">

                        <div>
                            {"{{googleForm.respondentEmail}}"} - Respondent's email
                        </div>


                        <div>
                            {"{{googleForm.responses['Question Name']}}"} - 
                            Response to a specific question
                        </div>


                        <div>
                            {"{{json googleForm.responses}}"} -
                            All responses as JSON
                        </div>


                    </div>

                </div>


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
                         setformDetail((a:any)=>{ return {nodeid : "" , name:"",open:false } })
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

    )
}