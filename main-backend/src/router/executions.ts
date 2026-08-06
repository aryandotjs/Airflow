import { Router } from "express";
import { prisma } from "../db/index.js";
import { authmiddleware } from "../middleware.js";
import { FlattenVariables } from "../workflow-engine/utils/flattenVariables.js";


export const ExecutionRouter = Router()

// add the middleware 
ExecutionRouter.post("/test1", async (req, res) => {
    // const id = (req as any).userId
    // const id = "test-user"
    const { name, channel } = req.body
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

