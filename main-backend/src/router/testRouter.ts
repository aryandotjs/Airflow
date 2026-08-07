// import { Router } from "express";
// import { prisma } from "../db/index.js";
// import { authmiddleware } from "../middleware.js";
// import { FlattenVariables } from "../workflow-engine/utils/flattenVariables.js";


// export const testRouter = Router()

// testRouter.post("/test1", async (req, res) => {
//     // const id = (req as anny).userId
//     // const id = "test-user"
//     const { text } = req.body
//     const userid = req.get("userid")

//     try {
//         return res.status(200).json({
//             userid,
//             automationresponse: text
//         })
//     } catch (err: anny) {
//         res.status(400).json({
//             msg: "creadential creation failed"
//         })
//     }

// })
// testRouter.get("/test2", async (req, res) => {
//     // const id = (req as anny).userId
//     // const id = "test-user"
//     const userid = req.get("userid")
//     try {
//         return res.status(200).json({
//             userid: userid,
//             msg: "user created in get ",
//             name: "aryan",
//             name2: "anu",
//         })
//     } catch (err: anny) {
//         res.status(400).json({
//             msg: "creadential creation failed"
//         })
//     }

// })

// testRouter.get("/variables", async (req, res) => {
//     const context = {
//         AddingUserVariable: {
//             body: {
//                 user: "aryan",
//                 channel: "sunday-running-club"
//             }
//         }
//     }
//     const variables = FlattenVariables(context)

//     res.json({
//         variables
//     })


// })
