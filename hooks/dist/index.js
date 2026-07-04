import express from "express";
import cors from "cors";
import { prisma } from "./db";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.json({
        msg: "yoo"
    });
});
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    console.log(userId, zapId, body);
    try {
        await prisma.$transaction(async (tx) => {
            const run = await tx.zaprun.create({
                data: {
                    zapId: zapId,
                    metadata: body
                }
            });
            await tx.zapRunOutBox.create({
                data: {
                    zaprunId: run.id
                }
            });
        });
        res.json({ message: "webhook recived" });
    }
    catch (err) {
        console.error("Webhook processing failed:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
app.listen(3004, () => {
    console.log("server runniing on port 3004");
});
//# sourceMappingURL=index.js.map