import { Router } from "express";
import { prisma } from "../db/index.js";
import { authmiddleware } from "../middleware.js";


export const CredentialRouter = Router()


CredentialRouter.post("/create", authmiddleware, async (req, res) => {
    const userid = req.userId;

    if (!userid) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }

    const { name, apikey, type } = req.body
    try {
        const cred = await prisma.credential.create({
            data: {
                name: name,
                type: type,
                value: {
                    apikey
                },
                userId: userid
            }
        })

        return res.status(200).json({
            msg: `credential ${name} created`,
            credid: cred.id
        })
    } catch (err: unknown) {
        console.log(err)
        res.status(400).json({
            msg: "creadential creation failed"
        })
    }

})

CredentialRouter.post("/update", authmiddleware, async (req, res) => {
    const userid = req.userId;

    if (!userid) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }

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
            msg: "This Credential has been update.",
            credid: cred.id
        })
    } catch (err: unknown) {
        res.status(400).json({
            err: err instanceof Error ? err.message : "Failed Editing Credential"
        })
    }

})

CredentialRouter.get("/all", authmiddleware, async (req, res) => {

    const userid = req.userId;

    if (!userid) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }

    try {
        const creds = await prisma.credential.findMany({
            where: {
                userId: userid
            }
        })
        return res.status(200).json({
            credential: creds
        })
    } catch (err: unknown) {
        res.status(400).json({
            msg: "creadential didnt found"
        })
    }

})

CredentialRouter.delete("/delete", authmiddleware, async (req, res) => {
    const userid = req.userId;

    if (!userid) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }

    const { apiId } = req.body
    try {
        await prisma.credential.delete({
            where: {
                id: apiId,
                userId: userid
            }
        })
        return res.status(200).json({
            msg: "This Credential has been deleted"
        })
    } catch (err: unknown) {
        res.status(400).json({
            msg: err instanceof Error ? err.message : "Failed deleting Credential"
        })
    }

})


