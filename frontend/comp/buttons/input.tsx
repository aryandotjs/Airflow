import { Dispatch, SetStateAction } from "react";
import { Secondarybutton } from "./secondarybutton";


export function Input({ name ,placeholder ,statesetter , state}:{state : string , statesetter : Dispatch<SetStateAction<string>>, name:string,placeholder:string }){
     return <div className="flex flex-col gap-2">
        <div className="text-sm font-medium">
           {name}
        </div>
        <div className="h-8">
            <Secondarybutton>
                <input onChange={(a)=> statesetter(a.target.value)} type="text" value={state} className="w-full outline-0" placeholder={placeholder}></input>
            </Secondarybutton>
        </div>
     </div>
}