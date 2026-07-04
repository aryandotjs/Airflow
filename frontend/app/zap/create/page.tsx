
"use client";

import { Appbar } from "@/comp/Appbar";
import { MainButton } from "@/comp/buttons/mainbutton";
import { Input } from "@/comp/input";
import { ZapCell } from "@/comp/zapcell";
import axios, { Axios } from "axios";
import { Children, useDebugValue, useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:3001";

function useAvailableItems(){
    const [AvailableActions , setAvailableActions] = useState([])
    const [AvailableTriggers , setAvailableTriggers] = useState([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/zap/available-triggers`)
        .then((a:any)=>{
           setAvailableTriggers(a.data.availabletrigger) 
        }) 
        axios.get(`${BACKEND_URL}/api/v1/zap/available-actions`)
        .then((a:any)=>{
           setAvailableActions(a.data.availableaction) 
        }) 
    },[])
   
    return {
        AvailableActions,
        AvailableTriggers
    }
}

export default function(){

    const {AvailableActions,AvailableTriggers} = useAvailableItems()

    const [triggerSelected ,settriggerSelected] = useState<{
        id : string,
        name : string
        image :string
    }>()
    const [actionsSelected , setactionsSelected] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: any;
        image : string
    }[]>([])

    useEffect(()=>{

    },[])

  

    const [ModelSelectedIndex,setModelSelectedIndex] = useState<null|number>(null)
  
     return <div>
        <Appbar/>
        <div className="flex  bg-slate-200 justify-end p-4"> 
            <MainButton onclick={()=>{
                console.log("clicked bhia ")
                 axios.post(`${BACKEND_URL}/api/v1/zap`,
                {
                    availableTriggerId: triggerSelected?.id,
                        triggerMetadata: {},
                        actions: actionsSelected.map((a,b)=> ({
                            availableActionId : a.availableActionId ,
                            actionMetadata : a.metadata
                        }))
                },
                {
                    headers : {
                         authorization : `bearer ${localStorage.getItem("token")}`
                    }
                }
                )
            }} >Publish </MainButton>
        </div>
     <div className="flex justify-center items-center  h-screen bg-slate-200">
        <div className="">
         <ZapCell image={ triggerSelected?.image} name={  triggerSelected?.name ? triggerSelected?.name :"Trigger"} index={1} onClick={()=>{
            setModelSelectedIndex(1)
         }}></ZapCell>

         <div>
            {actionsSelected.map((b:any,index)=> {
                return <div key={index} className="flex justify-center mt-2">
                  <ZapCell image={b.image} name={b.availableActionName ? b.availableActionName : "Action"} index={b.index} onClick={()=>{
                        setModelSelectedIndex(b.index)
                  }}></ZapCell>
                </div>
            })}
         </div>
         <div className="flex justify-center mt-5">
             <MainButton size={"big"} onclick={()=>{
                setactionsSelected(a => [...actionsSelected , {
                    index : a.length + 2,
                    availableActionId : "",
                    availableActionName : "",
                    metadata : {},
                    image : ""
                }])
             }} >+</MainButton>
         </div>
         <div>
           {ModelSelectedIndex ? <Model index={ModelSelectedIndex} availableItems={ModelSelectedIndex == 1 ? AvailableTriggers : AvailableActions}
            onSelect={(props : null | {name : string , id :string , metadata :any , image :string})=>{
                 if (props === null) {
                    setModelSelectedIndex(0)
                    return ;
                 }
                 if (ModelSelectedIndex === 1 ) {
                     settriggerSelected({
                         id : props?.id ,
                         name : props?.name,
                         image : props.image
                      })
                }else{
                    setactionsSelected((a:any)=>{
                        let Allactions = [...actionsSelected]
                        console.log(Allactions,"1")
                        console.log(Allactions[ModelSelectedIndex - 2])
                         Allactions[ModelSelectedIndex - 2] = {
                            index: ModelSelectedIndex,
                            availableActionId: props?.id,
                            availableActionName: props?.name,
                            metadata: props?.metadata,
                            image:props.image
                        }
                        return Allactions
                    })

                }
                setModelSelectedIndex(null);
           }}/> : ""}
         </div>
        </div>
     </div>
     <div className="flex justify-center items-center" onSelect={()=>{}}>
     </div>
     </div>
}

function Model( {index , availableItems , onSelect}:
    {
    index :number ,
    availableItems :{name : string , id : string , image :string }[] , 
    onSelect :( props : null | { name: string; id: string; metadata: any; image :string} ) => void  
    }
    ){
        
    const [step,setstep] = useState(0)
    const triggerflag = index == 1  
    const [crraction , setcrraction] = useState<{id : string , name :string ,image :string}>()
    return <div className=" fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
        
     <div className="px-10 py-4 border ">
        <div className="flex justify-between">
            <div className="p-4 border-b-2"> select {index == 1 ? " trigger" : " action"}</div>
            <div className="bg-blue-300 h-6 w-6 border cursor-pointer flex justify-center items-center" 
                onClick={()=>{
                    onSelect(null)
                }}
            >x</div>
            </div>

                {step == 1 && crraction?.name == "Email" && <EmailSelector setMetadata={(metadata)=>{
                      onSelect({
                         ...crraction,
                         metadata
                      })
                }}/>}

                {step == 0 &&  <div>
                    {availableItems?.map(
                        ({name,id,image})=>{
                            return <div  onClick={()=>{
                                if(triggerflag){
                                    onSelect({
                                      id,
                                      name,
                                      metadata : {},
                                      image 
                                    })
                                }else{
                                    setstep(a => a + 1)
                                    setcrraction({
                                        id ,
                                        name ,
                                        image
                                    })
                                }
                            }} key={id} className="flex m-2 items-center border cursor-pointer">
                                        <img src={image} className="h-8 w-8" ></img>
                                        {name}
                                </div>
                        })}
                </div>}
       
        </div>
    </div>
}


function EmailSelector({setMetadata} : {setMetadata : (params:any)=>void}){
    const [email , setemail] = useState("")
    const [body , setbody] = useState("")

    return <div>
         <Input label={"Email"} placeholder={"zyx@gmail.com"} onChange={a=> setemail(a.target.value)}></Input>
         <Input label={"Body"} placeholder={"body"} onChange={a=> setbody(a.target.value)}></Input>
         <div className="p-2">-</div>
         <MainButton  onclick={()=>{
              setMetadata({email,body})
         }}>Submit</MainButton>
    </div>
}