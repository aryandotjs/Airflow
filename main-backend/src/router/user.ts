import { response, Router } from "express";
;
import { SignInSchema } from "../types";
import { SignUpSchema } from "../types";
import { prisma } from "../db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { authmiddleware } from "../middleware";
import { email } from "zod";
import { da } from "zod/locales";
export const userRouter = Router()

// userRouter.get("/random", (req, res) => {
//     res.json({
//         msg: "done working "
//     })
// })
// userRouter.post("/signup", async (req, res) => {
//     const body = req.body
//     console.log(req.body)
//     const ParsedResponse = SignUpSchema.safeParse(body)

//     if (!ParsedResponse.success) return res.status(411).json({ message: "invalid data" })

//     const existingUser = await prisma.user.findFirst({
//         where: {
//             email: ParsedResponse.data.email
//         }
//     })
//     if (existingUser) { return res.status(403).json({ message: "email already exist" }) }

//     const hashedpassword = await bcrypt.hash(ParsedResponse.data.password, 10)


//     const user = await prisma.user.create({
//         data: {
//             email: ParsedResponse.data.email,
//             password: hashedpassword,
//             name: ParsedResponse.data.name
//         }
//     })

//     const token = jwt.sign(
//         { userId: user.id },
//         process.env.JWT_SECRET || " ",
//         { expiresIn: "24h" }
//     )

//     ///todo send email broda

//     return res.json({ msg: "user created successfully check your email", token })

// })



// userRouter.post("/signin", async (req, res) => {
//     const body = req.body

//     const ParsedResponse = SignInSchema.safeParse(body)

//     if (!ParsedResponse.success) return res.status(411).json({ msg: "give valid input" })
//     const user = await prisma.user.findFirst({
//         where: {
//             email: ParsedResponse.data?.email
//         }
//     })

//     if (!user) return res.status(400).json({ message: "invalid email or password" })

//     // const HashResponse = await bcrypt.compare(ParsedResponse.data?.password, user.password)

//     // if (!HashResponse) return res.status(400).json({ message: "invalid email or password" })

//     const token = jwt.sign(
//         { userId: user.id },
//         process.env.JWT_SECRET || " ",
//         { expiresIn: "24h" }
//     )
//     res.status(200).json({
//         token: token
//     })
// })

// userRouter.get("/user", authmiddleware, async (req, res) => {
//     const userId = (req as any).userId
//     const user = await prisma.user.findFirst({
//         where: {
//             id: userId
//         },
//         select: {
//             email: true,
//             name: true
//         }
//     })
//     res.status(401).json({
//         user
//     })
// })