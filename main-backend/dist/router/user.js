import { response, Router } from "express";
import { SignInSchema } from "../types";
import { SignUpSchema } from "../types";
import { Client } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authmiddleware } from "../middleware";
import { email } from "zod";
export const userRouter = Router();
userRouter.post("/signup", async (req, res) => {
    const body = req.body;
    const ParsedResponse = SignUpSchema.safeParse(body);
    if (!ParsedResponse.success)
        return res.status(411).json({ message: "invalid data" });
    const reponse = await Client.User.findFirst({
        where: {
            username: ParsedResponse.data.username
        }
    });
    if (response) {
        return res.status(403).json({ message: "Username already exist" });
    }
    const hashedpassword = bcrypt.hash(ParsedResponse.data.password, 10);
    const user = await Client.User.Create({
        data: {
            username: ParsedResponse.data.username,
            password: hashedpassword,
            name: ParsedResponse.data.name
        }
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || " ", { expiresIn: "24h" });
    ///todo send email broda
    res.json({ msg: "user created successfully check your email", token });
});
// userRouter.post("/signin", async (req, res) => {
//     const body = req.body
//     const ParsedResponse = SignInSchema.safeParse(body)
//     if (!ParsedResponse) return res.status(411).json({ msg: "give valid input" })
//     const user = await Client.User.findFirst({
//         where: {
//             username: ParsedResponse.data?.username
//         }
//     })
//     if (!user) return res.status(400).json({ message: "invalid username or password" })
//     const HashResponse = bcrypt.compare(ParsedResponse.data?.password, user.password)
//     if (!HashResponse) return res.status(400).json({ message: "invalid username or password" })
//     const token = jwt.sign(
//         { userId: user.id },
//         process.env.JWT_SECRET || " ",
//         { expiresIn: "24h" }
//     )
//     res.status(200).json({
//         token: token
//     })
// })
// userRouter.post("/user", authmiddleware, async (req, res) => {
//     const userId = req.userId
//     const user = Client.User.findFirst({
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
//# sourceMappingURL=user.js.map