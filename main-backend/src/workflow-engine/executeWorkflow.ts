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
    const steps: any[] = []

    for (const node of sortednodes) {
        const step: any = {
            nodeId: node.id,
            nodeName: node.name,
            status: "RUNNING",
            startedAt: new Date()
        }
        steps.push(step)

        try {
            contex = await executeNode(node, contex)
            step.status = "SUCCESS"
            step.completedAt = new Date()
            step.duration =
                step.completedAt.getTime()
                -
                step.startedAt.getTime()

        } catch (err: any) {
            step.status = "FAILED"
            step.completedAt = new Date()
            step.error = err.message
            step.duration =
                step.completedAt.getTime()
                -
                step.startedAt.getTime()
            throw err
        }
    }

    return {
        context: contex,
        steps
    }

    // console.log("finalContext :", contex)
}
