



export default async function({params}:{params:Promise<{ workflowid: string }>}) {
     const { workflowid} = await params 
    return <div className="flex h-screen ">
         {workflowid}
         {/* {card <Workflows card={card} setcard={setcard} settoasts={settoasts}></Workflows> : ""} */}
    </div>
}

{/* <div className="flex-1 ">
  <div className="border-b border-b-brand-border dark:border-b-dark-border  h-15 flex items-center flex-row-reverse px-7 gap-6 select-none">
      <div className="flex h-8 ">
      </div>how the 
  </div>
  <div className="relative">
      <div className=" h-158  overflow-y-auto  [&::-webkit-scrollbar]:hidden ">
          {card === "Credentials" ? <Credentials card={card} settoasts={settoasts}></Credentials>  : ""}
          {card === "Create" ? <CreateZap card={card}></CreateZap> : ""}
          {card === "Executions" ? <Executions card={card} ></Executions> : ""}
      </div>
  </div>
</div>
<div className="fixed bottom-6 right-6 w-90 flex flex-col-reverse gap-4 pointer-events-none ">
  {toasts.map((toast,index)=>(
      <Toast key={toast.id} settoast={settoasts} toast={toast}></Toast>
  ))}

</div> */}