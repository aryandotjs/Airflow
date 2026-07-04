import { Router } from "express";
import { authmiddleware } from "../middleware";
import { prisma } from "../db";
import { ZapCreateSchema } from "../types";

export const zapRouter = Router()

zapRouter.post("/", authmiddleware, async (req, res) => {
    console.log(1)
    const Id = (req as any).userId
    console.log(Id)
    const body = req.body;
    const parsedbody = ZapCreateSchema.safeParse(body)
    if (!parsedbody.success) {
        return res.status(401).json({ message: "invalid data" })

    }
    console.log(parsedbody.data)
    const zap = await prisma.zap.create({
        data: {
            userId: parseInt(Id),
            trigger: {
                create: {
                    triggerId: parsedbody.data.availableTriggerId,
                    metadata: parsedbody.data.triggerMetadata
                }
            },
            actions: {
                create: parsedbody.data?.actions.map((a, b) => ({
                    ActionId: a.availableActionId,
                    sortingOrder: b,
                    metadata: a.actionMetadata
                }))
            }
        }
    })
    console.log("done")
    res.json({
        zapId: zap.id
    })
})

zapRouter.get("/", authmiddleware, async (req, res) => {
    // const userId = (req as any).userId;

    const zaps = await prisma.zap.findMany({
        where: {
            userId: 3
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    })
    return res.json({ zaps })
})

zapRouter.get("/all", async (req, res) => {
    // const userId = (req as any).userId;

    const zaps = await prisma.zaprun.findMany({
        where: {
            type: {
                userId: 3
            }
        },
        take: 20,
        orderBy: {
            id: "desc"
        },
        include: {
            type: {
                include: {
                    actions: {
                        include: {
                            type: true
                        }
                    }
                    ,
                    trigger: {
                        include: {
                            type: true
                        }
                    }
                }
            },
            zapRunOutBox: true,
        }
    })
    return res.json({ zaps })
})

zapRouter.get("/available-triggers", async (req, res) => {

    const availabletrigger = await prisma.availableTrigger.findMany({})
    return res.json({ availabletrigger })
})

zapRouter.get("/available-actions", async (req, res) => {

    const availableaction = await prisma.availableAction.findMany({})
    return res.json({ availableaction })
})

