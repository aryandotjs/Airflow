import { Router } from "express";
import { prisma } from "../db";


export const NodeRouter = Router()

const name1 = [
    "Quine",
    "Daemon",
    "Entropy",
    "Heuristic",
    "Mutex",
    "Parity",
    "Lemnisca",
    "Turing",
    "Algorism",
    "Cobol"
];

const name2 = [
    "HexDump",
    "NullVoid",
    "BitRot",
    "ColdBoot",
    "Deadlock",
    "RaceCondition",
    "ForkBomb",
    "StackOverflow",
    "ZeroDay",
    "ShadowCopy"
];
NodeRouter.post("/create", async (req, res) => {
    const userid = "test-user"
    const { position, type, workflowid } = req.body
    const name = name1[Math.floor(Math.random() * 10)] + "-" + name1[Math.floor(Math.random() * 10)]
    console.log(name, position, type, workflowid)
    try {
        const Node = await prisma.node.create({
            data: {
                name: name,
                position: position,
                type: type,
                workflowId: workflowid
            }
        })
        res.json({ msg: 'node created', Node })
    } catch (error) {
        console.log(error)
        res.json({ msg: 'node creation failed', err: error })
    }

})

NodeRouter.get("/all", async (req, res) => {
    const workflows = await prisma.workflow.findMany({
        where: {
            userId: "test-user"
        },
        orderBy: {
            updatedAt: "desc"
        }
    });
    res.json(workflows);
})
