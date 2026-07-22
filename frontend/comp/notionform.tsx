import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "./buttons/input"
import { BigInput } from "./biggerinput"
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative"
import { Secondarybutton } from "./buttons/secondarybutton"
import { Cross } from "./svg/allsvg"
export function NotionTriggerForm({
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

     
     const initialValue = {DatabaseId:""}
    const [formdata,setformdata] = useState<{DatabaseId:string}>(initialValue)
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



  return (<div className={` transition duration-300 ease-initial ${formDetail.name == "Notion" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div className={` transition duration-300 ${formDetail.name == "Notion"?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name}</div>
                     <div onClick={()=>{
                        setformDetail((a:any)=>{ return {nodeid:"" , name:"",open:false } })
                        setformdata(initialValue)
                     }} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                      <div className="my-6 flex flex-col gap-6 w-115 overflow-y-scroll max-h-100 p-2">

                        <div className="text-sm">
                        Connect your Notion database to trigger this workflow when a new
                        page is created or updated.
                        </div>

                        <div className="text-xs flex flex-col gap-2">
                        <p>Setup instructions:</p>

                        <p>1. Open your Notion database</p>
                        <p>2. Click Share → Invite your integration</p>
                        <p>3. Copy the Database ID</p>
                        <p>4. Paste it below</p>
                        <p>5. Save the workflow</p>
                        </div>


                        <Input
                        placeholder="Notion Database ID"
                        name="Database ID"
                        state={formdata.DatabaseId}
                        statesetter={(a)=>{setformdata((prev:any)=>({...prev , DatabaseId : a}))}}
                        />


                        <div className="text-xs">
                        <p className="mb-2">Available Variables</p>

                        <p>{"{{notion.page.id}}"} - Page ID</p>
                        <p>{"{{notion.page.title}}"} - Page title</p>
                        <p>{"{{notion.page.properties}}"} - Database properties</p>
                        <p>{"{{json notion.page}}"} - Complete page data as JSON</p>
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