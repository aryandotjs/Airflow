import { Router } from "express";
import { authmiddleware } from "../middleware";
import { prisma } from "../db";
import { ZapCreateSchema } from "../types";
import { executeWorkflow } from "../workflow-engine/executeWorkflow";
import { validateWorkflow } from "../workflow-engine/validateWorkflow";
import { nanoid } from "nanoid";
// import { ZapStatus } from "../generated/prisma/enums";

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

WorkflowRouter.post("/", async (req, res) => {
    // const Id = (req as any).userId
    // const body = req.body;
    // const parsedbody = ZapCreateSchema.safeParse(body)
    // if (!parsedbody.success) {
    //     return res.status(401).json({ message: "invalid data" })

    // }
    const id = "test-user"
    const name = name1[Math.floor(Math.random() * 10)] + "-" + name1[Math.floor(Math.random() * 10)]
    try {
        const workflow = await prisma.workflow.create({
            data: {
                name: name,
                userId: id
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

// zapRouter.get("/", authmiddleware, async (req, res) => {
//     // const userId = (req as any).userId;

//     const zaps = await prisma.zap.findMany({
//         where: {
//             userId: 3
//         },
//         include: {
//             actions: {
//                 include: {
//                     type: true
//                 }
//             },
//             trigger: {
//                 include: {
//                     type: true
//                 }
//             }
//         }
//     })
//     return res.json({ zaps })
// })

WorkflowRouter.post("/togglestatus", authmiddleware, async (req, res) => {
    // const userId = (req as any).userId;
    const userid = 3
    const { crrstatus, workflowid } = req.body
    let status = crrstatus;

    if (crrstatus === "DRAFT" ||
        crrstatus === "PAUSED") {

        const validation = await validateWorkflow(workflowid)

        if (!validation.success) {
            return res.status(400).json({
                msg: "Workflow cannot be activated",
                errors: validation.errors
            })
        }

        status = "ACTIVE"
    }

    if (crrstatus === "ACTIVE") {
        status = "PAUSED";
    }

    await prisma.workflow.update({
        where: {
            id: workflowid
        },
        data: {
            status
        }
    })

    return res.json({
        msg: `Workflow ${status}`
    })

})



WorkflowRouter.post("/duplicate", async (req, res) => {
    // const userId = (req as any).userId;
    const userid = "test-user"
    const { workflowid } = req.body

    try {

        const ogWorkflow = await prisma.workflow.findUnique({
            where: {
                id: workflowid
            },
            include: { nodes: true, connections: true }
        })

        if (!ogWorkflow) return res.json({ msg: `Workflow not found` })

        const duplicateZap = await prisma.$transaction(async (tx) => {

            const newWorkflow = await tx.workflow.create({
                data: {
                    name: `${ogWorkflow.name} (copy)`,
                    userId: ogWorkflow.userId
                }
            })

            const idMap = new Map()


            await tx.node.createMany({
                data: ogWorkflow.nodes.map((node: any) => {
                    const newId = crypto.randomUUID()
                    idMap.set(node.id, newId)
                    return {
                        id: newId,
                        name: node.name,
                        position: node.position,
                        type: node.type,
                        workflowId: newWorkflow.id,
                        data: node.metadata,
                    }
                })
            })

            await tx.connection.createMany({
                data: ogWorkflow.connections.map((c) => {

                    return {
                        workflowId: newWorkflow.id,
                        fromNodeId: idMap.get(c.fromNodeId),
                        toNodeId: idMap.get(c.toNodeId),
                    }
                })
            })

            return newWorkflow
        })
        return res.json({
            msg: "Workflow duplicated",
            workflow: duplicateZap
        });
    } catch (error) {

        return res.status(500).json({
            msg: "Failed duplicating workflow"
        });
    }



})

WorkflowRouter.delete("/delete", async (req, res) => {
    // const userId = (req as any).userId;
    const userid = "test-user"
    const { name, workflowid } = req.body
    try {
        const response = await prisma.workflow.delete({
            where: {
                id: workflowid
            },
        })

        return res.json({
            msg: `${name} deleted`
        })


    } catch (error) {
        console.log(error)
        return res.json({
            msg: `Failed deleting ${name} `
        })
    }

})


WorkflowRouter.get("/all", async (req, res) => {
    // const userId = (req as any).userId;
    try {

        const workflows = await prisma.workflow.findMany({
            where: {
                userId: "test-user"
            }
        })
        return res.json({ workflows })

    } catch (error) {
        console.log(error)
        return res.json({ msg: "eroro aaya bhai dekhle " })
    }

})

WorkflowRouter.put("/rename", authmiddleware, async (req, res) => {
    // const userId = (req as any).userId;
    const userid = "test-user"
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
            msg: `name changed to ${newname}`
        })


    } catch (error) {
        return res.json({
            msg: `Failed changing name`
        })
    }

})


WorkflowRouter.get("/:workflowid", authmiddleware, async (req, res) => {
    // const userId = (req as any).userId;
    const { workflowid } = req.params
    const workflow = await prisma.workflow.findFirst({
        where: {
            id: workflowid
        },
        include: {
            nodes: true,
            connections: true
        }
    })
    return res.json(workflow)
})


WorkflowRouter.put("/:workflowid", async (req, res) => {
    // const userId = (req as any).userId;
    const { workflowid } = req.params
    const { nodes, edges } = req.body
    try {

        await prisma.$transaction(async (tsx) => {
            await tsx.node.deleteMany({
                where: {
                    workflowId: workflowid
                }
            })
            await tsx.connection.deleteMany({
                where: {
                    workflowId: workflowid
                }
            })
            await tsx.node.createMany({
                data: nodes.map((node: any) => {
                    const metadata = node.data.metadata
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
            msg: "workflow saved successfully"
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: "Failed to save workflow",
        });
    }
})


WorkflowRouter.get("/executions/all", async (req, res) => {
    // const userId = (req as any).userId;
    const userid = "test-user"
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
            completedAt: "desc",
        }
        ,
    })
    return res.json(allExecutions)
})


WorkflowRouter.post("/test/:workflowId", async (req, res) => {

    const workflowId = req.params.workflowId

    try {
        const result = await executeWorkflow(workflowId);

        res.json({
            msg: "Workflow executed",
            executionId: result.executionId
        })
    } catch (error: any) {

        res.status(500).json({
            msg: "Workflow failed",
            error: error.message
        })
    }

})