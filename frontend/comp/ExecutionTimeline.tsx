export function ExecutionTimeline({steps}:{steps:any[]}){

    return <div>
        {steps.map((step:any)=>(
            <div key={step} className="">
                <div>
                    {step.status === "SUCCESS"
                        ? "🟢"
                        : "🔴"
                    }
                    {step.nodeName}
                </div>
                <div className="ml-6">
                    duration   {step.duration}ms

                </div>
            </div>
        ))}
    </div> 
}