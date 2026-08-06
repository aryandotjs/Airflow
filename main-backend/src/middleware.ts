import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

export function authmiddleware(req: Request, res: Response, next: NextFunction) {
    const authheader = req.headers.authorization
    if (!authheader) {
        return res.status(401).json({
            msg: "token not available"
        });
    }
    const token = authheader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "token not availabe" })
    try {
        const response = jwt.verify(token, process.env.JWT_SECRET || "") as { userId: string }
        req.userId = response.userId
        next()
    } catch (error: unknown) {
        res.status(401).json({
            msg: error instanceof Error ? error.message : "Invalid token error"
        })
    }
}