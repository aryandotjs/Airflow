import jwt from "jsonwebtoken"

export async function authmiddleware(req: any, res: any, next: any) {
    // const token = req.headers.authorization.split(" ")[1];
    // console.log("1")
    // if (!token) return res.status(404).json({ msg: "token not availabe" })
    try {
        // console.log("1")
        // const response: any = await jwt.verify(token, process.env.JWT_SECRET || "")
        // req.userId = response.userId as string
        req.userId = "3"
        console.log("1")
        next()
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}