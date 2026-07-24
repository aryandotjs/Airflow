import { prisma } from "../db"
import { topologicalSort } from "./topologicalsort"


export async function executeWorkflow(workflowId: string) {

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId
        },
        include: {
            nodes: true,
            connections: true
        }
    })
    if (!workflow) {
        throw Error("no workflow here")
    }
    topologicalSort(workflow.nodes, workflow.connections)
}
