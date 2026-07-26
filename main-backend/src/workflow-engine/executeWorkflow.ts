import { prisma } from "../db"
import type { WorkflowContext } from "./contex"
import { executeNode } from "./executeNode"
import { topologicalSort } from "./topologicalSort"



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

    const sortednodes = topologicalSort(workflow.nodes, workflow.connections)

    let contex: WorkflowContext = {}

    for (const node of sortednodes) {
        contex = await executeNode(node, contex)
    }

    console.log(contex)

}
