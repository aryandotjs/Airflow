import { Router } from "express";

import { SignInSchema } from "../types/index.js";
import { SignUpSchema } from "../types/index.js";
import { prisma } from "../db/index.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { authmiddleware } from "../middleware.js";
export const userRouter = Router()


userRouter.post("/signup", async (req, res) => {
    const body = req.body
    const ParsedResponse = SignUpSchema.safeParse(body)

    if (!ParsedResponse.success) return res.status(411).json({ message: "invalid data" })

    const existingUser = await prisma.user.findFirst({
        where: {
            email: ParsedResponse.data.email
        }
    })
    if (existingUser) { return res.status(403).json({ message: "email already exist" }) }

    const hashedpassword = await bcrypt.hash(ParsedResponse.data.password, 10)


    const user = await prisma.user.create({
        data: {
            email: ParsedResponse.data.email,
            passwordHash: hashedpassword,
            name: ParsedResponse.data.name
        }
    })

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || " ",
        { expiresIn: "24h" }
    )

    ///todo send email broda

    return res.json({ message: "user created successfully check your email", token })

})



userRouter.post("/signin", async (req, res) => {
    const body = req.body

    const ParsedResponse = SignInSchema.safeParse(body)

    if (!ParsedResponse.success) return res.status(411).json({ message: "give valid input" })
    const user = await prisma.user.findFirst({
        where: {
            email: ParsedResponse.data?.email
        }
    })

    if (!user) return res.status(400).json({ message: "invalid email or password" })
    if (!user.passwordHash) return res.status(400).json({ message: "invalid email or password" })

    const HashResponse = await bcrypt.compare(ParsedResponse.data?.password, user.passwordHash)

    if (!HashResponse) return res.status(400).json({ message: "invalid email or password" })

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || " ",
        { expiresIn: "24h" }
    )
    res.status(200).json({
        message: "logged in successfully",
        token: token
    })
})

userRouter.get("/me", authmiddleware, async (req, res) => {
    const userid = req.userId;

    if (!userid) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const user = await prisma.user.findFirst({
        where: {
            id: userid
        },
        select: {
            email: true,
            name: true
        }
    })

    res.status(200).json({
        user
    })
})