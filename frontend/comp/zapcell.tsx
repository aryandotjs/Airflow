
export const ZapCell = ({
    name,
    index,
    onClick,
    image
}: {
    name?: string; 
    index: number;
    onClick: () => void;
    image? : string | null
}) => {
    return <div onClick={onClick} className="border bg-green-100 border-black py-8 px-8 flex w-[300px] justify-start cursor-pointer">
        <div className="flex text-xl  items-center ml-8 gap-2 w-full">
            <div className="font-bold">
                {image ? "" : `${index}.` }
            </div>
            {image ? <img src={image} className="h-10 w-10 "></img> : ""}
            <div>
                {name}
            </div>
        </div>
    </div>
}