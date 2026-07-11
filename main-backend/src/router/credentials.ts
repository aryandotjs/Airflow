import { Router } from "express";
import { prisma } from "../db";
import { authmiddleware } from "../middleware";


export const CredentialRouter = Router()

// add the middleware 
CredentialRouter.post("/create", async (req, res) => {
    // const id = (req as any).userId
    const id = "test-user"
    const { name, apikey, type } = req.body

    try {
        const cred = await prisma.credential.create({
            data: {
                name: name,
                type: type,
                value: {
                    apikey
                },
                userId: id
            }
        })

        return res.status(200).json({
            msg: "credential created",
            credid: cred.id
        })
    } catch (err: any) {
        res.status(400).json({
            msg: "creadential creation failed"
        })
    }

})

CredentialRouter.post("/update", async (req, res) => {
    // const id = (req as any).userId
    const userid = "test-user"
    const { credid, name, apikey, type } = req.body

    try {
        if (!(credid && name && apikey && type)) throw new Error("inputs are incorrect")
        const cred = await prisma.credential.update({
            where: {
                id: credid,
                userId: userid
            },
            data: {
                name: name,
                value: {
                    apikey
                },
                type: type,
            }
        })

        return res.status(200).json({
            msg: "creadential Updated",
            credid: cred.id
        })
    } catch (err: any) {
        res.status(400).json({
            err: err.message ?? "something went wrong"
        })
    }

})

CredentialRouter.get("/all", async (req, res) => {
    // const id = (req as any).userId
    const id = "test-user"
    // const { name, apikey, type } = req.body

    try {
        const creds = await prisma.credential.findMany({
            where: {
                userId: id
            }
        })

        return res.status(200).json({
            credential: creds
        })
    } catch (err: any) {
        res.status(400).json({
            msg: "creadential didnt found"
        })
    }

})

CredentialRouter.delete("/delete", async (req, res) => {
    // const id = (req as any).userId
    const id = "test-user"
    const { apiId } = req.body

    try {
        const creds = await prisma.credential.delete({
            where: {
                id: apiId
            }
        })
        return res.status(200).json({
            msg: "Creadential delete succesfully"
        })
    } catch (err: any) {
        res.status(400).json({
            msg: err.message ?? "something went wrong"
        })
    }

})


