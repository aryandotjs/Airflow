import { Router } from "express";
import { authmiddleware } from "../middleware.js";


export const ExecutionRouter = Router()

ExecutionRouter.post("/test1", authmiddleware, async (req, res) => {
    const { name, channel } = req.body
    try {
        return res.status(200).json({
            message: "user created",
            user: name,
            channel: channel
        })
    } catch (err: unknown) {
        res.status(400).json({
            message: "creadential creation failed"
        })
    }

})

