import { prisma } from "../db/index.js"



export async function validateWorkflow(workflowId: string) {

    const errors: string[] = []

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
        return {
            success: false,
            errors: ["Workflow not found"]
        }
    }

    const triggers = workflow.nodes.filter(
        node => node.type === "trigger"
    );

    if (triggers.length === 0) {
        errors.push("Workflow needs a trigger");
    }
    if (triggers.length > 1) {
        errors.push("Workflow can only have one trigger");
    }

    if (workflow.nodes.length > 1) {
        for (const node of workflow.nodes) {

            const data = node.data as any

            if (node.name === "HTTP-request") {
                if (!data.Endpoint) {
                    errors.push(
                        "HTTP request endpoint missing"
                    )
                }
            }

            if (node.name === "discord") {
                if (!data.webhookUrl) {
                    errors.push(
                        "Discord webhook URL missing"
                    )
                }
            }

            const hasconnection = workflow.connections.some((a) => a.fromNodeId === node.id || a.toNodeId === node.id)
            if (!hasconnection) {
                errors.push(
                    `${node.name} is not connected`
                )
            }
        }
    }
    return {
        success: errors.length === 0,
        errors
    }
}