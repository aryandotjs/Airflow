import { DetailCard } from "@/comp/executions";

export default async function({params}:{params:Promise<{id:string}>}){
    const {id}  = await params
    return <div>
       <DetailCard id={id}></DetailCard>
    </div>
}