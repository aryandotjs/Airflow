import { Router } from "express";
import { prisma } from "../db";
import { authmiddleware } from "../middleware";
import { FlattenVariables } from "../workflow-engine/utils/flattenVariables";
import { executeWorkflow } from "../workflow-engine/executeWorkflow";

export type WorkflowContext = Record<string, any>
export const webhookRouter = Router()



webhookRouter.post("/:webhookId", async (req, res) => {
    console.log("hey iwas herr")
    const { webhookId } = req.params
    const webhooknode = await prisma.node.findFirst({
        where: {
            data: {
                path: ["WebhookId"],
                equals: webhookId
            }
        }
    })

    if (!webhooknode) {
        return res.status(404).json({
            message: "Webhook not found"
        })
    }
    await executeWorkflow(webhooknode?.workflowId, {
        Webhookpayload: {
            body: req.body
        }
    })

    res.json({
        done: "true"
    })
})
