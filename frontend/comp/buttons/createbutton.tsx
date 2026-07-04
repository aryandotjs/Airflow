// import { ReactNode } from "react";
// import { Add } from "../svg/allsvg";

// export function CreateButton({} : {}){
//      return <div  className={` flex justify-center h-9  cursor-pointer bg-[#E9E9E9] pr-10 dark:text-[#F0F0F0] dark:bg-[#151619] rounded-lg text-center flex-col font-semibold "h-10  w-full `}>
//       <div className={`flex w-full gap-1.5  items-center justify-center`}>
//          <Add size="20"></Add>
//          <div>Create</div>
//       </div>
//      </div>
// } 
import { Add } from "../svg/allsvg";

export function CreateButton() {
  return (
    <button className="w-full h-10 flex items-center justify-center gap-2 cursor-pointer rounded-xl font-bold text-sm transition-all duration-150 active:scale-95 border
      bg-[#151619] text-[#F0F0F0] border-transparent 
      dark:bg-[#F0F0F0] dark:text-[#151619] dark:border-transparent ">
      <Add size="18" />
      <span>Create</span>
    </button>
  );
}