import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId
    const zapId = req.params.zapId
    const body = req.body
    try {
        await client.$transaction(async tx => {
            const run = await tx.Zaprun.create({
                data: {
                    zapId: zapId,
                    metadata: body
                }
            })
            await tx.zapRunOutBox.create({
                data: {
                    zarunId: run.id
                }
            })
        })
        res.json({ message: "webhook recived" })
    } catch (err) {
        console.error("Webhook processing failed:", err);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(3000, () => console.log("server on 3000"))