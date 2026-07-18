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
    const { Allnodes } = req.body
    const name = name1[Math.floor(Math.random() * 10)] + "-" + name1[Math.floor(Math.random() * 10)]
    console.log(Allnodes)
    try {
        const Node = await prisma.node.createMany({
            data: Allnodes
        })
        res.json({ msg: 'node created', Node })
    } catch (error) {
        console.log(error)
        res.json({ msg: 'node creation failed', err: error })
    }

})