interface Props{
    variable : string []
    onInsert : (variable:string)=>void
}

export default function VariablePicker(
    {
    variable,
    onInsert
}:Props){

    return <div className="text-sm border p-2">
         <h3>
             Avaialbe variables
         </h3>
         {
            variable.map((variable)=>(
                <div key={variable} className="flex justify-between"
                >
                
                <span>{variable}</span>
                <button
                className="border"
                onClick={() => onInsert(variable)}
                >
                            Insert
                        </button>
           
                </div>
            ))
         }
    </div>
}