import express from "express"
import { userRouter } from "./router/user"
import cors from "cors"
import { CredentialRouter } from "./router/credentials"
import { WorkflowRouter } from "./router/workflow"
import { NodeRouter } from "./router/node"
const app = express()

app.use(express.json())
app.use(cors())



app.use("/api/v1/user", userRouter)
app.use("/api/v1/workflow", WorkflowRouter)
app.use("/api/v1/node", NodeRouter)
app.use("/api/v1/credentials", CredentialRouter)

app.listen(3001, () => {
    console.log("server runniing on port 3001")
})
