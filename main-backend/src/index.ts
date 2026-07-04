import express from "express"
import { userRouter } from "./router/user"
import cors from "cors"
import { zapRouter } from "./router/zap"
import { CredentialRouter } from "./router/credentials"
const app = express()

app.use(express.json())
app.use(cors())



app.use("/api/v1/user", userRouter)
app.use("/api/v1/zap", zapRouter)
app.use("/api/v1/credentials", CredentialRouter)

app.listen(3001, () => {
    console.log("server runniing on port 3001")
})
