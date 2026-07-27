import { Router } from "express";
import { prisma } from "../db";
import { authmiddleware } from "../middleware";
import { FlattenVariables } from "../workflow-engine/utils/flattenVariables";


export const ExecutionRouter = Router()

// add the middleware 
ExecutionRouter.post("/test1", async (req, res) => {
    // const id = (req as any).userId
    // const id = "test-user"
    const { name, channel } = req.body
    console.log(name, channel, "from the api")
    try {
        return res.status(200).json({
            msg: "user created",
            user: name,
            channel: channel
        })
    } catch (err: any) {
        res.status(400).json({
            msg: "creadential creation failed"
        })
    }

})

