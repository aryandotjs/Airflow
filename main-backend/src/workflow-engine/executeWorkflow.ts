import { prisma } from "../db/index.js"
import type { WorkflowContext } from "./contex.js"
import { executeNode } from "./executeNode.js"
import { topologicalSort } from "./topologicalSort.js"
import { Prisma } from "../generated/prisma/client.js"

interface ExecutionStep {
    nodeId: string;
    nodeName: string;
    status: "RUNNING" | "SUCCESS" | "FAILED";
    startedAt: Date;
    completedAt?: Date;
    duration?: number;
    error?: string;
}

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
    let contex: WorkflowContext = initialContext
    const steps: ExecutionStep[] = []
    try {

        const workflow = await prisma.workflow.findUnique({
            where: {
                id: workflowId
            },
            include: {
                nodes: {
                    include: {
                        credential: true
                    }
                },
                connections: true
            }
        })
        if (!workflow) {
            throw Error("no workflow here")
        }

        const sortednodes = topologicalSort(workflow.nodes, workflow.connections)



        for (const node of sortednodes) {
            const step: ExecutionStep = {
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

            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Unknown error"
                step.status = "FAILED"
                step.completedAt = new Date()
                step.error = message
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
                } as unknown as Prisma.InputJsonValue
            }
        })

        return {
            context: contex,
            steps,
            executionId: execution.id
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "unknown error"
        const reser = await prisma.execution.update({
            where: {
                id: execution.id
            },
            data: {
                status: "FAILED",
                completedAt: new Date(),
                error: message,
                output: {
                    context: contex,
                    steps
                } as unknown as Prisma.InputJsonValue
            }
        })
        throw err
    }


}
