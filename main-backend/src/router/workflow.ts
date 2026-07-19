import { Router } from "express";
import { authmiddleware } from "../middleware";
import { prisma } from "../db";
import { ZapCreateSchema } from "../types";
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
    const workflow = await prisma.workflow.create({
        data: {
            name: name,
            userId: id
        }
    })
    res.json({
        workflow
    })
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

// zapRouter.post("/togglestatus", authmiddleware, async (req, res) => {
//     // const userId = (req as any).userId;
//     const userid = 3
//     const { crrstatus, workflowid } = req.body
//     let status = crrstatus;
//     try {

//         if (crrstatus === ZapStatus.PAUSED ||
//             crrstatus === ZapStatus.DRAFT) {
//             status = ZapStatus.ACTIVE
//         }

//         if (crrstatus == ZapStatus.ACTIVE) {

//             status = ZapStatus.PAUSED
//         }
//         const zap = await prisma.zap.updateMany({
//             where: {
//                 id: workflowid,
//                 userId: userid
//             },
//             data: {
//                 status: status
//             }
//         })
//         return res.json({
//             zap,
//             msg: `Workflow ${status.toString().toLowerCase()}`
//         })

//     } catch (error) {
//         return res.json({
//             msg: `Failed Workflow ${crrstatus.toString().toLowerCase()}`
//         })
//     }

// })



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

        const duplicateZap = prisma.$transaction(async (tx) => {

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
        console.log(error);

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
                data: nodes.map((node: any) => ({
                    id: node.id,
                    name: node.data.name,
                    position: node.position,
                    type: node.type,
                    workflowId: workflowid,
                    data: node.data.metadata,

                }))
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
            success: true,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to save workflow",
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
        orderBy: {
            completedAt: "desc",
        }
        ,
    })
    console.log(allExecutions)
    return res.json(allExecutions)
})