import JsonView from "react18-json-view";
import { Copy } from "./svg/allsvg";



export function CodeShow({header , code}:{header:string , code :JSON}){
  return <div>
     <div className="mt-2 flex flex-col gap-2">
            <div className="text-lg font-semibold tracking-wide dark:text-[#F0F0F0] text-[#191919]">
                {header}
            </div>
           <div className="w-full bg-brand-dark-bg rounded-[14px] px-4 py-3 font-mono text-md select-text relative ">
                <button 
                onClick={()=>{navigator.clipboard.writeText(JSON.stringify(code))}}
                    // onClick={() => navigator.clipboard.writeText(JSON.stringify(rawJsonData, null, 2))}
                    className="transition-all active:scale-80 duration-150 absolute top-4 right-4 text-[#71767B] hover:text-[#E1E8ED]   hover:bg-[#2C3034] rounded-md p-0.5 z-10"
                >
                                                <Copy size="19"></Copy>
                </button>
                <div className="text-left overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    <JsonView 
                    src={code} 
                    dark
                    allExpanded={true}
                    enableClipboard={false}     
                    displaySize={false}
                    className="overflow-x-auto whitespace-pre [&::-webkit-scrollbar]:hidden"
                    style={{
                        color: '#A0A0A0', 

                        // @ts-ignore
                        '--json-property': '#D2D3D4',  
                        '--json-string': '#84CFC0',    
                        '--json-number': '#6C6C6C',    
                        '--json-index': '#6C6C6C',     
                        '--json-boolean': '#6C6C6C',   
                        '--json-null': '#6C6C6C',      
                    }}
                    />
            </div>
    </div>
        </div>
  </div>
}