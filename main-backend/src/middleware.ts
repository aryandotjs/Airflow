import jwt from "jsonwebtoken"

export function authmiddleware(req: any, res: any, next: any) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(404).json({ msg: "token not availabe" })
    try {
        const response = jwt.verify(token, process.env.JWT_SECRET || "")
        req.userId = response.userId
        next()
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}