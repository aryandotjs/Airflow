// "use client"
// import { useRouter } from "next/navigation";
// import { MainButton } from "./buttons/mainbutton";
// import { SecondaryButton } from "./buttons/secondarybutton";
// import { Feature } from "./feature";

// export function HeroSection(){
//     const router = useRouter();

//     return <div>
//         <div className="flex justify-center">
//             <div className="text-5xl font-semibold text-center pt-8 max-w-xl">
//                 Automate as fast as you can type    
//             </div>
//         </div>
//         <div className="flex justify-center pt-2">
//             <div className="text-xl  font-normal text-center pt-8 max-w-2xl">
//                 AI gives you automation superpowers, and Airflow puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
//             </div>
//         </div>

//         <div className="flex justify-center pt-4">
//             <div className="flex">
//                  <MainButton onclick={() => router.push("/signup") } size="big">Get Started free</MainButton>
//                 <div className="pl-4">
//                     <SecondaryButton  onclick={() => {}} size="big">Contact Sales</SecondaryButton>
//                 </div>
//             </div>
//         </div>

//         <div className="flex justify-center pt-4">
//             <Feature title={"Free Forever"} subtitle={"for core features"}></Feature>
//             <Feature title={"More apps"} subtitle={"than any other platforms"} />
//             <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
//         </div>
//     </div>
// }