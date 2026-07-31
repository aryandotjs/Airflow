export function ExecutionTimeline({ steps }: { steps: any[] }) {
    return (
        <div className="flex flex-col gap-3">
            {steps.map((step: any, index: number) => (
                <div key={index} className="flex items-center justify-between rounded-xl border border-[#EEEEEE] dark:border-[#191B1E] px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div
                            className={`h-2.5 w-2.5 rounded-full ${step.status === "SUCCESS" ? "bg-green-500": "bg-red-500" }`}
                        />

                        <div className="dark:text-[#F0F0F0] text-[#191919] text-sm font-medium">
                            {step.nodeName}
                        </div>
                    </div>
                    <div className="text-xs dark:text-[#9C9FA0] text-[#666666]">
                        {step.duration} ms
                    </div>
                </div>
            ))}
        </div>
    );
}
