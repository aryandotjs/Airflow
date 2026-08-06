import { Router } from "express";
import { prisma } from "../db/index.js";
import { executeWorkflow } from "../workflow-engine/executeWorkflow.js";

export const webhookRouter = Router()



webhookRouter.post("/:webhookId", async (req, res) => {
    const webhookId = req.params.webhookId as string
    const webhooknode = await prisma.node.findFirst({
        where: {
            data: {
                path: ["WebhookId"],
                equals: webhookId
            }
        },
        include: {
            workflow: true
        }
    })

    if (!webhooknode) {
        return res.status(404).json({
            message: "Webhook not found"
        })
    }
    if (webhooknode.workflow.status != "ACTIVE") {
        return res.status(404).json({
            message: "Webhook inactive"
        })
    }
    await executeWorkflow(webhooknode.workflowId, {
        Webhookpayload: {
            body: req.body
        }
    })

    res.json({
        done: "true"
    })
})
