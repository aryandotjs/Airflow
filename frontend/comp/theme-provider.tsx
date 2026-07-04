import { useEffect, useState } from "react";
import { Secondarybutton } from "./buttons/secondarybutton";
import { Day, Night } from "./svg/allsvg";
import { Namebox } from "./buttons/namebox";



export function ThemeProvider(){
     const [isdark ,setisdark] = useState(false)
     useEffect(()=>{
          const token = localStorage.getItem("theme")
          const darkprefrerd = window.matchMedia("(prefers-color-scheme:dark)").matches

          if (token === "dark" || (!token && darkprefrerd)) {
             setisdark(true)
             document.documentElement.classList.add("dark")
          }
     },[])

     const toggle =()=>{
         if (isdark) {
            localStorage.setItem("theme","light")
            document.documentElement.classList.remove("dark")
         }else{
           document.documentElement.classList.add("dark")
           localStorage.setItem("theme","dark")
         }
         setisdark(!isdark)
     }

     return  <Secondarybutton onclick={toggle} name={isdark?"Light":"Dark"}>{isdark ? <Namebox><Day size={"15"}></Day></Namebox> : <Namebox><Night size={"15"}></Night></Namebox>}</Secondarybutton>
}