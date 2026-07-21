"use client"
import { ReactFlow , Node, Background, Controls, Edge, useNodesState, useEdgesState, Connection, addEdge, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import RightsideBar from "./rightsidebar";
import Trigger, { Action } from "./trigger";
import { Add, Cross, Save } from "./svg/allsvg";
import axios from "axios";
import AiForm from "./AiForm";
import { Addform } from "./addform";
import { Input } from "./buttons/input";
import { BigInput } from "./biggerinput";
import { OpenerButton } from "./buttons/openerButton";
import { OpenOptions } from "./openoptions";
import { Opneframe } from "./openframe";
import { MainButton } from "./buttons/mainbutton";
import { Secondarybutton } from "./buttons/secondarybutton";
import { ThemeProvider } from "./theme-provider";
import { useRouter } from "next/navigation";
import { metadata } from "@/app/layout";
import { SecondarybuttonNegative } from "./buttons/secondarybuttonnegative";

// export let InitialNodes : Node<{name :string , metadata :string , onDelete : (id:any)=>void}>[] = [{
//     id : '1',
//     position : { x : 340 , y: 340},
//     type : "trigger",
//     data : {
//        name : "Aryan" ,
//        metadata : "",
//        onDelete : (id)=>{}
//     }
// }]


const BACKEND_URL = "http://localhost:3001";

export const  nodeTypes  = {
    "trigger": Trigger,
    "action" : Action
}
type workflow = {
    name :string
}
export const InitialNodes : [] = []
export const InitialEdges : Edge [] = []

export function WorkflowContent({workflowid}:{workflowid:any}){
    const [formDetail, setformDetail] = useState<{name :string , open : boolean}>({name :"" , open : false});
    ///// we were doming the setdetail again and decided to add exepetion case in the addform ting 
    const [nodes,setNodes,onNodesChange] = useNodesState(InitialNodes)
    const [edges,setEdges,onEdgesChange] = useEdgesState(InitialEdges)
    const [ sidebaropen , setsidebaropen ] = useState(false)
    
    // const onConnect = useCallback((Connection:Connection)=>{
    //     const edge = { ...Connection , id : `${edges.length}+1`}
    //     setEdges(( prevEdges : any) =>  addEdge(edge,prevEdges));
        
    // },[]) 
    const onConnect = useCallback((connection: Connection) => {
                 setEdges((prevEdges) => addEdge(connection, prevEdges));
        }, [setEdges]);
    
    const [ wholeworkflow , setwholeworkflow ] = useState<workflow|null>()

    // from here only for diffpur
    // const {creds} = UseCred()
   
    // const [credName,setcredName] = useState("") 
    // const [type,settype] = useState<any>() 
    // const [open,setopen] = useState<any>(false) 
    // const [systemprompt,setsystemprompt] = useState<any>("") 
    // till here only for diffpur
    
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workflow/${workflowid}`)
            .then((a: any) => {
            setwholeworkflow(a.data)
            console.log(a.data)
            const structuredNodes = a.data.nodes.map((n: any) => ({
                id: n.id,
                position: n.position,
                type: n.type,
                data: {
                name: n.name,
                metadata : n.data,
                openForm : setformDetail
                },
            }));
            const structuredEdges = a.data.connections.map((c: any) => ({
                source:c.fromNodeId,
                target:c.toNodeId,
                id: `xy-edge__${c.fromNodeId}-${c.toNodeId}`
            }));

            setNodes(structuredNodes);
            setEdges(structuredEdges)
            });
    }, [workflowid]);

const Router = useRouter();
    return <div 
         className="h-160 w-full  relative">
            {JSON.stringify(nodes)}
            {/* ----- */}
            {/* {JSON.stringify(formDetail)} */}
             <div className="h-15 border-b w-full items-center justify-between  border-b-brand-border dark:border-b-dark-border   px-6  normal font-semibold flex    "> 
                <div className="flex gap-2 text-sm font-normal">
                    <div onClick={()=>Router.push("/workflows")} className="cursor-pointer">{"workflows"}</div>
                    <div>{">"}</div>
                    <div>{`${wholeworkflow?.name ?? workflowid}`}</div>
                </div>
                <div className="h-8">
                  <ThemeProvider></ThemeProvider>
                </div>
             </div>
            
            <RightsideBar setsidebaropen={setsidebaropen} sidebaropen={sidebaropen} setformDetail={setformDetail}></RightsideBar>

            <button onClick={()=>setsidebaropen(true)} className="absolute right-5 top-20 z-10  transition duration-100 ">
                <div className="h-8 rounded-sm  flex items-center bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040] w-8 justify-center">
                     <Add size="22"></Add>
                </div>
            </button>
            <button onClick={async()=>{
           
                 const response = await axios.put(`${BACKEND_URL}/api/v1/workflow/${workflowid}`,{
                        nodes , edges
                 })
                
                 Router.push("/workflows")
            }} className="absolute right-5 top-30 z-10 gap-0.5 ">
                <div className="h-8 rounded-sm px-2 active:scale-95 duration-100  flex items-center bg-[#E9E9E9] dark:bg-[#151619] dark:text-[#9C9FA0] text-[#404040] text-xs font-semibold justify-center">
                    <div>Save</div>
                     <Save size="14"></Save>
                </div>
            </button>
            <ReactFlow
                    nodes={nodes} 
                    edges={edges} 
                    onNodesChange={onNodesChange} 
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}>
                    <Background/>
                    <Controls/>
            </ReactFlow>
            <AiForm setformDetail={setformDetail} formDetail={formDetail} AiName="Anthropic" AiType={"CLAUDE"}></AiForm>
            <AiForm setformDetail={setformDetail} formDetail={formDetail} AiName="Gemini" AiType={"GEMINI"}></AiForm>
            <AiForm setformDetail={setformDetail} formDetail={formDetail}  AiName="OpenAi" AiType={"CHATGPT"}></AiForm>

            <DiscordForm setformDetail={setformDetail} formDetail={formDetail} ></DiscordForm>
            <NotionTriggerForm setformDetail={setformDetail} formDetail={formDetail} ></NotionTriggerForm>
            <GoogleSheetTriggerForm setformDetail={setformDetail} formDetail={formDetail} ></GoogleSheetTriggerForm>
            <GoogleFormTriggerForm setformDetail={setformDetail} formDetail={formDetail} ></GoogleFormTriggerForm>
    </div>
}


function DiscordForm({setformDetail,formDetail}:{setformDetail:Dispatch<SetStateAction<any>>,formDetail:any}){
     const {creds} = UseCred()
        const [credName,setcredName] = useState("") 
        const [type,settype] = useState<any>() 
        const [open,setopen] = useState<any>(false) 
        const [systemprompt,setsystemprompt] = useState<any>("") 
        const [userprompt,setuserprompt] = useState<any>("") 
        return <div className={` transition duration-300 ease-initial ${ formDetail.name == "discord" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
                <div className={` transition duration-300 ${ formDetail.name  == "discord" ?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
                    <div className={`p-6 `} >
                        <div className="flex w-full justify-between items-center ">
                             <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name}</div>
                             <div onClick={()=>{setformDetail({name:"",open:false})}} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                        </div>
                        <div className="">
                         <div className="my-6 flex flex-col gap-6 w-115 overflow-y-scroll max-h-100 p-2 ">
                            <div>
                                <Input placeholder={`my-Discord-variable`} name="Variable Name" state={credName} statesetter={setcredName}></Input>
                                <div className="mt-1 text-xs">{`Name of the variable to store the response :{{$My-Discord-response.text}}`}</div>
                            </div>
                            <div>
                                <Input placeholder={`http://discort.com/api/webhooks/...`} name="Webhook Url" state={credName} statesetter={setcredName}></Input>
                                <div className="mt-1 text-xs">{`Get this from Discord Channel Settings - Integrations - New Webhook`}</div>
                            </div>
                            
                            
                            <div>
                               <BigInput placeholder="Summary: {{myGemini:text}}" name="Content" state={userprompt} statesetter={setuserprompt}></BigInput> 
                               <div className=" text-xs">{"The message to send. Use {{variables}} for simple values or {{json variable}} to stringify objects"}</div>
                            </div>
                            <div>
                                <Input placeholder={`automation-bot`} name="Username (Optional)" state={credName} statesetter={setcredName}></Input>
                                <div className="mt-1 text-xs">{`The username to use for the webhook`}</div>
                            </div>
                         </div> 
                    </div>
                        <div  className="flex gap-2 w-full">
                            <div onClick={()=>{}} className="h-8 w-30 transition-all duration-150 active:scale-95">
                                <SecondarybuttonNegative>
                                    <div className=" px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                        Save
                                    </div>
                                </SecondarybuttonNegative>
                            </div>
                            <div onClick={()=>{setformDetail({name : "" ,  open:false})}} className="h-8 w-30 transition-all duration-150 active:scale-95 ">
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



                    


    }
// this notion one is creepy
function NotionTriggerForm({
  setformDetail,
  formDetail,
}: {
  setformDetail: Dispatch<SetStateAction<any>>;
  formDetail: any;
}) {
  const [database, setDatabase] = useState("");

  return (<div className={` transition duration-300 ease-initial ${formDetail.name == "Notion" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div className={` transition duration-300 ${formDetail.name == "Notion"?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name}</div>
                     <div onClick={()=>{setformDetail({name : "" ,  open:false})}} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
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
                        state={database}
                        statesetter={setDatabase}
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
                    <div onClick={()=>{}} className="h-8 w-30 transition-all duration-150 active:scale-95">
                        <SecondarybuttonNegative>
                            <div className=" px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                Save
                            </div>
                        </SecondarybuttonNegative>
                    </div>
                    <div onClick={()=>{setformDetail({name : "" ,  open:false})}} className="h-8 w-30 transition-all duration-150 active:scale-95 ">
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
 function GoogleSheetTriggerForm({
    setformDetail,
    formDetail
}: {
    setformDetail: Dispatch<SetStateAction<any>>;
    formDetail: any;
}) {

    const [credName, setcredName] = useState("");
    const [spreadsheetId, setspreadsheetId] = useState("");
    const [sheetName, setsheetName] = useState("");

    const [event, setevent] = useState<any>();
    const [open, setopen] = useState(false);


    return (  <div className={` transition duration-300 ease-initial ${formDetail.name =="Google-sheet" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div className={` transition duration-300 ${formDetail.name =="Google-sheet"?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name}</div>
                     <div onClick={()=>{setformDetail({name : "" ,  open:false})}} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                 <div className="my-6 flex flex-col gap-4 w-115 overflow-y-scroll h-100 p-2">


                <div>
                    <Input
                        placeholder="my-google-sheet-variable"
                        name="Variable Name"
                        state={credName}
                        statesetter={setcredName}
                    />

                    <div className="mt-1 text-xs">
                        Name of the variable to store the response:
                        {" {{googleSheet.rows}}"}
                    </div>
                </div>



                <div>
                    <Input
                        placeholder="Spreadsheet ID"
                        name="Spreadsheet ID"
                        state={spreadsheetId}
                        statesetter={setspreadsheetId}
                    />

                    <div className="mt-1 text-xs">
                        ID of the Google Spreadsheet to watch.
                    </div>
                </div>



                <div>
                    <Input
                        placeholder="Sheet1"
                        name="Sheet Name"
                        state={sheetName}
                        statesetter={setsheetName}
                    />

                    <div className="mt-1 text-xs">
                        Name of the sheet where new data will be detected.
                    </div>
                </div>



                <div className="w-full flex flex-col gap-1 text-sm font-medium">

                    <div>
                        Trigger Event
                    </div>


                    <div className="relative z-10">

                        <OpenerButton
                            simplefilter={
                                event ? event : "Select Event"
                            }
                            open={open}
                            setopen={setopen}
                        />


                        <div
                            className={`absolute w-full top-7 transition duration-150 ${
                                open
                                ? "opacity-100 translate-y-3"
                                : "translate-y-0 opacity-0 pointer-events-none"
                            }`}
                        >

                            <OpenOptions
                                simplefilter={event}
                                open={open}
                                setopen={setopen}
                                setsimplefilter={setevent}
                            >

                                <Opneframe>

                                    {
                                        [
                                            "New Row Added",
                                            "Row Updated"
                                        ].map((item,index)=>(
                                            <div
                                                key={index}
                                                onClick={()=>{
                                                    setevent(item);
                                                    setopen(false);
                                                }}
                                                className="m-1.5"
                                            >

                                                <MainButton>

                                                    <div className="text-xs font-normal">
                                                        {item}
                                                    </div>

                                                </MainButton>

                                            </div>
                                        ))
                                    }

                                </Opneframe>

                            </OpenOptions>

                        </div>

                    </div>

                </div>




                <div className="text-xs mt-2">

                    <div className="font-medium mb-2">
                        Available Variables
                    </div>


                    <div className="flex flex-col gap-1">

                        <div>
                            {"{{googleSheet.row}}"} - Latest row data
                        </div>

                        <div>
                            {"{{googleSheet.row['Column Name']}}"} - Specific column value
                        </div>

                        <div>
                            {"{{json googleSheet.row}}"} - Complete row as JSON
                        </div>


                    </div>

                </div>


            </div>
                <div  className="flex gap-2 w-full">
                    <div onClick={()=>{}} className="h-8 w-30 transition-all duration-150 active:scale-95">
                        <SecondarybuttonNegative>
                            <div className=" px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                Save
                            </div>
                        </SecondarybuttonNegative>
                    </div>
                    <div onClick={()=>{setformDetail({name : "" ,  open:false})}} className="h-8 w-30 transition-all duration-150 active:scale-95 ">
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

 function GoogleFormTriggerForm({
    setformDetail,
    formDetail
}: {
    setformDetail: Dispatch<SetStateAction<any>>;
    formDetail: any;
}) {

    const [credName, setcredName] = useState("");
    const [formId, setformId] = useState("");


    return (<div className={` transition duration-300 ease-in-out ${formDetail.name == "google-forms" ?  "opacity-100 " : " opacity-0 pointer-events-none " } fixed flex w-full h-full md:inset-0 justify-center items-center bg-brand-bg/90 dark:bg-brand-dark-bg/90 z-20`}>
        <div className={` transition duration-300 ${formDetail.name == "google-forms" ?  " scale-100" : "scale-95  "}  border border-[#C6C6C6] dark:border-[#2C3034] rounded-4xl  bg-brand-bg dark:bg-brand-dark-bg`}>
            <div className={`p-6 `} >
                <div className="flex w-full justify-between items-center ">
                     <div className="text-[17px] font-semibold dark:text-brand-bg ">{formDetail.name}</div>
                     <div onClick={()=>{setformDetail({name : "" ,  open:false})}} className="h-6 w-6 rounded-md flex items-center justify-center  hover:bg-[#E9E9E9] hover:dark:bg-[#151619]"><Cross size="16"></Cross></div>
                </div>
                  <div className="my-6 flex flex-col gap-4 w-115 overflow-y-scroll h-100 p-2">


                <div>

                    <Input
                        placeholder="my-google-form-variable"
                        name="Variable Name"
                        state={credName}
                        statesetter={setcredName}
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
                        state={formId}
                        statesetter={setformId}
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
                    <div onClick={()=>{}} className="h-8 w-30 transition-all duration-150 active:scale-95">
                        <SecondarybuttonNegative>
                            <div className=" px-1 text-brand-bg text-sm pb-0.5 dark:text-brand-dark-bg dark:font-semibold">
                                Save
                            </div>
                        </SecondarybuttonNegative>
                    </div>
                    <div onClick={()=>{setformDetail({name : "" ,  open:false})}} className="h-8 w-30 transition-all duration-150 active:scale-95 ">
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
export const UseCred =()=>{
    const [creds, setcreds] = useState([]);

    useEffect(()=>{
       axios.get(`${BACKEND_URL}/api/v1/credentials/all`, {
            // headers: {
            //     "authorization": `Bearer ${localStorage.getItem("token")}`
            // }
        })
            .then(res => {
                setcreds(res.data.credential.sort((a:any,b:any)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
            })
    },[])
    return {
        creds
    }
}



