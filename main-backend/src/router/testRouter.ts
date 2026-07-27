import { Router } from "express";
import { prisma } from "../db";
import { authmiddleware } from "../middleware";
import { FlattenVariables } from "../workflow-engine/utils/flattenVariables";


export const testRouter = Router()

// add the middleware 
testRouter.post("/test1", async (req, res) => {
    // const id = (req as any).userId
    // const id = "test-user"
    const { name, channel } = req.body
    console.log(name, channel, "from the api")
    try {
        return res.status(200).json({
            msg: "user created",
            name: name,
            channel: channel
        })
    } catch (err: any) {
        res.status(400).json({
            msg: "creadential creation failed"
        })
    }

})

testRouter.get("/variables", async (req, res) => {
    const context = {
        AddingUserVariable: {
            body: {
                user: "aryan",
                channel: "sunday-running-club"
            }
        }
    }
    const variables = FlattenVariables(context)

    res.json({
        variables
    })

    res.json({
        variables
    })
})
