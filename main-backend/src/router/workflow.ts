import { Router } from "express";
import { authmiddleware } from "../middleware.js";
import { prisma } from "../db/index.js";
import { executeWorkflow } from "../workflow-engine/executeWorkflow.js";
import { validateWorkflow } from "../workflow-engine/validateWorkflow.js";
import { nanoid } from "nanoid";
import { Prisma } from "../generated/prisma/client.js";

export const WorkflowRouter = Router()
const name1 = [
    "NebulaVortex",
    "QuantumShadow",
    "ApexTitan",
    "CyberPulse",
    "EchoChroma",
    "SolarFlint",
    "AetherShift",
    "NovaScribe",
    "VectorGrip",
    "BeaconGrid"
]

const name2 = [
    "ZephyrForge",
    "VortexDrive",
    "TitanSpire",
    "ShadowFlux",
    "PulseMatrix",
    "OracleCore",
    "LunaCrypt",
    "HelixFrost",
    "GlitchBound",
    "AlphaPrism"
]

WorkflowRouter.post("/", authmiddleware, async (req, res) => {
    const userid = req.userId
    if (!userid) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }
    const name = name1[Math.floor(Math.random() * 10)] + "-" + name1[Math.floor(Math.random() * 10)]
    try {
        const workflow = await prisma.workflow.create({
            data: {
                name: name,
                userId: userid
            }
        })
        return res.json({
            msg: `Workflow ${workflow.name} created bc`,
            workflow
        })

    } catch (error) {
        res.json({
            msg: `creadential creation failed`,
        })
    }
})


WorkflowRouter.post("/togglestatus", authmiddleware, async (req, res) => {
    const userid = req.userId;
    if (!userid) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }
    const { crrstatus, workflowid } = req.body
    let status = crrstatus;
    if (crrstatus === "DRAFT") {

        const validation = await validateWorkflow(workflowid)

        if (!validation.success) {
            return res.status(400).json({
                msg: "Workflow cannot be activated",
                errors: validation.errors
            })
        }

        status = "ACTIVE"
    }

    if (crrstatus === "PAUSED") {
        status = "ACTIVE"
    }

    if (crrstatus === "ACTIVE") {
        status = "PAUSED";
    }

    await prisma.workflow.update({
        where: {
            id: workflowid,
            userId: userid
        },
        data: {
            status
        }
    })

    return res.json({
        msg: `Workflow ${status}`
    })

})



WorkflowRouter.post("/duplicate", authmiddleware, async (req, res) => {
    const userid = req.userId;

    if (!userid) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const { workflowid } = req.body

    try {

        const ogWorkflow = await prisma.workflow.findUnique({
            where: {
                id: workflowid,
                userId: userid
            },
            include: { nodes: true, connections: true }
        })

        if (!ogWorkflow) return res.status(404).json({ message: `Workflow not found` })

        const duplicateZap = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

            const newWorkflow = await tx.workflow.create({
                data: {
                    name: `${ogWorkflow.name} (copy)`,
                    userId: ogWorkflow.userId
                }
            })

            const idMap = new Map<string, string>()


            await tx.node.createMany({
                data: ogWorkflow.nodes.map((node: any) => {
                    const newId = crypto.randomUUID()
                    idMap.set(node.id, newId)
                    return {
                        id: newId,
                        name: node.name,
                        position: node.position,
                        type: node.type,
                        data: node.metadata,
                        workflowId: newWorkflow.id,
                    }
                })
            })

            await tx.connection.createMany({
                data:
                    ogWorkflow.connections.map((c) => {

                        const fromNodeId = idMap.get(c.fromNodeId)
                        const toNodeId = idMap.get(c.toNodeId)

                        if (!fromNodeId || !toNodeId) {
                            return null
                        }

                        return {
                            workflowId: newWorkflow.id,
                            fromNodeId,
                            toNodeId
                        }
                    }).filter((c) => c !== null)
            })

            return newWorkflow
        })
        return res.json({
            message: "Workflow duplicated",
            workflow: duplicateZap
        });
    } catch (error) {

        return res.status(500).json({
            message: "Failed duplicating workflow"
        });
    }



})

WorkflowRouter.delete("/delete", authmiddleware, async (req, res) => {
    const userid = req.userId;
    if (!userid) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const { workflowid } = req.body
    try {
        const response = await prisma.workflow.delete({
            where: {
                id: workflowid,
                userId: userid

            },
        })
        return res.json({
            message: `${response.name ?? "Workflow"} deleted`
        })


    } catch (error: unknown) {
        return res.status(500).json({
            message: `Failed deleting Workflow `
        })
    }

})


WorkflowRouter.get("/all", authmiddleware, async (req, res) => {
    const userid = req.userId;
    if (!userid) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    try {

        const workflows = await prisma.workflow.findMany({
            where: {
                userId: userid
            }
        })
        return res.json({ workflows })

    } catch (error: unknown) {
        console.log(error)
        return res.status(500).json({ message: "error getting workflows" })
    }

})

WorkflowRouter.put("/rename", authmiddleware, async (req, res) => {
    const userid = req.userId;
    if (!userid) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const { newname, workflowid } = req.body
    try {
        const response = await prisma.workflow.update({
            where: {
                userId: userid,
                id: workflowid
            },
            data: {
                name: newname
            }
        })

        return res.json({
            message: `name changed to ${newname}`
        })


    } catch (error: unknown) {
        return res.status(500).json({
            message: `Failed changing name`
        })
    }

})


WorkflowRouter.get("/:workflowid", authmiddleware, async (req, res) => {
    const userid = req.userId;
    if (!userid) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const workflowid = req.params.workflowid as string

    const workflow = await prisma.workflow.findFirst({
        where: {
            id: workflowid,
            userId: userid
        },
        include: {
            nodes: true,
            connections: true
        }
    })
    if (!workflow) {
        return res.status(404).json({
            message: "Workflow not found"
        });
    }
    return res.json(workflow)
})


WorkflowRouter.put("/:workflowid", authmiddleware, async (req, res) => {
    const userid = req.userId;
    if (!userid) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const workflowid = req.params.workflowid as string
    const { nodes, edges } = req.body
    try {

        await prisma.$transaction(async (tsx: Prisma.TransactionClient) => {
            await tsx.workflow.update({
                where: {
                    id: workflowid,
                },
                data: {
                    status: "DRAFT"
                }
            })

            await tsx.node.deleteMany({
                where: {
                    workflowId: workflowid,
                }
            })

            await tsx.connection.deleteMany({
                where: {
                    workflowId: workflowid,
                }
            })
            await tsx.node.createMany({
                data: nodes.map((node: any) => {
                    const metadata = node.data.metadata ?? {}
                    if (node.data.name === "Webhook") {
                        metadata.WebhookId = nanoid()
                    }
                    return {
                        id: node.id,
                        name: node.data.name,
                        position: node.position,
                        type: node.type,
                        workflowId: workflowid,
                        data: node.data.metadata,
                        credentialId: node.data.metadata?.Credential?.id
                    }
                })
            })

            await tsx.connection.createMany({
                data: edges.map((edge: any) => ({
                    workflowId: workflowid,
                    fromNodeId: edge.source,
                    toNodeId: edge.target,
                }))
            })
        })

        res.json({
            message: "workflow saved successfully"
        });

    } catch (error: unknown) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to save workflow",
        });
    }
})


WorkflowRouter.get("/executions/all", authmiddleware, async (req, res) => {
    const userid = req.userId;
    if (!userid) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const allExecutions = await prisma.execution.findMany({
        where: {
            workflow: {
                userId: userid
            }
        },
        include: {
            workflow: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            startedAt: "desc",
        }
        ,
    })
    return res.json(allExecutions)
})


WorkflowRouter.post("/test/:workflowId", authmiddleware, async (req, res) => {
    const userid = req.userId;

    if (!userid) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const workflowId = req.params.workflowId as string


    try {
        const result = await executeWorkflow(workflowId);

        res.json({
            message: "Workflow executed",
            executionId: result.executionId
        })
    } catch (error: unknown) {
        res.status(500).json({
            message: "Workflow failed",
            error: error instanceof Error ? error.message : "Workflow execution failed"
        })
    }

})