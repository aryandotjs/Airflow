import { ThemeProvider } from "./theme-provider";


export default function Navbar(){
    return <div className="h-15 border-b w-full items-center border-r  border-b-brand-border dark:border-b-dark-border   px-6  normal font-semibold flex  justify-end  "> 
        <div className="h-8">
            <ThemeProvider></ThemeProvider>
        </div>
    </div>
}