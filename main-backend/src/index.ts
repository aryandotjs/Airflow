import express from "express"
import { userRouter } from "./router/user.js"
import cors from "cors"
import { CredentialRouter } from "./router/credentials.js"
import { WorkflowRouter } from "./router/workflow.js"
import { NodeRouter } from "./router/node.js"
import { testRouter } from "./router/testRouter.js"
import { webhookRouter } from "./router/webhoook.js"

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://airflow-9gxf-nu.vercel.app"
    ],
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
