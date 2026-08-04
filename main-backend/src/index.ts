import express from "express"
import { userRouter } from "./router/user"
import cors from "cors"
import { CredentialRouter } from "./router/credentials"
import { WorkflowRouter } from "./router/workflow"
import { NodeRouter } from "./router/node"
import { testRouter } from "./router/testRouter"
import { webhookRouter } from "./router/webhoook"

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))



app.use("/api/v1/user", userRouter)
app.use("/api/v1/workflow", WorkflowRouter)
app.use("/api/v1/node", NodeRouter)
app.use("/api/v1/credentials", CredentialRouter)
app.use("/api/v1/test", testRouter)
app.use("/api/v1/webhook", webhookRouter)

app.listen(PORT, () => {
    console.log(`server runniing on port ${PORT}`)
})
