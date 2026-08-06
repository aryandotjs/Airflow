import { ThemeProvider } from "./theme-provider";


export default function Navbar(){
    return <div className="h-15 border-b w-full items-center   border-b-brand-border dark:border-b-dark-border   px-6  normal font-semibold flex  justify-end  "> 
        <div className="h-7 lg:h-8">
            <ThemeProvider></ThemeProvider>
        </div>
    </div>
}