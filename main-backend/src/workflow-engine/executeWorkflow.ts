import { prisma } from "../db"
import type { WorkflowContext } from "./contex"
import { executeNode } from "./executeNode"
import { topologicalSort } from "./topologicalSort"



export async function executeWorkflow(
    workflowId: string,
    initialContext: WorkflowContext = {}
) {

    const execution = await prisma.execution.create({
        data: {
            workflowId,
            status: "RUNNING"
        }
    })

    try {

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

        let contex: WorkflowContext = initialContext
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

        await prisma.execution.update({
            where: {
                id: execution.id
            },
            data: {
                status: "SUCCESS",
                completedAt: new Date(),
                output: {
                    context: contex,
                    steps
                }
            }
        })

        return {
            context: contex,
            steps,
            executionId: execution.id
        }
    } catch (err: any) {

        await prisma.execution.update({
            where: {
                id: execution.id
            },
            data: {
                status: "FAILED",
                completedAt: new Date(),
                error: err.message
            }
        })

        throw err
    }


}
