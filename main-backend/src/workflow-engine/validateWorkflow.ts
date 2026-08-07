import { prisma } from "../db/index.js"
import { DiscordNodeData, GeminiNodeData, HttpNodeData } from "../types/node.js";



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

            if (node.name === "HTTP-request") {
                const data = node.data as HttpNodeData
                if (!data.Endpoint) {
                    errors.push(
                        "HTTP request endpoint missing"
                    )
                }
                if (!data.Method) {
                    errors.push(
                        "HTTP request Method missing"
                    )
                }
            }

            if (node.name === "discord") {
                const data = node.data as DiscordNodeData
                if (!data.webhookUrl) {
                    errors.push(
                        "Discord webhook URL missing"
                    )
                }
                if (!data.content) {
                    errors.push(
                        "Discord content missing"
                    )
                }
            }

            if (node.name === "gemini") {
                const data = node.data as GeminiNodeData
                if (!data.UserPrompt) {
                    errors.push(
                        "Discord UserPrompt missing"
                    )
                }
                if (!data.Credential) {
                    errors.push(
                        "Discord Credential missing"
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