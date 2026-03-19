import ApiExceptionNameEnum from "api/enums/apiExceptionNameEnum";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JsonWebTokenError, JwtPayload } from "jsonwebtoken"
interface AppJwtPayload extends JwtPayload {
    id: number
    email: string
    accountType: "student" | "professor"
}
const EnsureAuthenticatedUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookie = req.cookies["auth_cookie"]
        if (!cookie) {
            res.status(401).json({ name: ApiExceptionNameEnum.UNAUTHENTICATED_USER, message: "You are note authenticated on the api" })
            return
        }
        const secretKey = process.env.JWT_SECRET
        if (!secretKey) {
            res.status(500).json({ message: "Internal server error" })
            console.log("Missing JWT Secret Key")
            process.exit(1)
        }
        const decoded: AppJwtPayload = jsonwebtoken.verify(cookie, secretKey) as AppJwtPayload
        if (decoded.exp && (decoded?.exp < Math.floor(Date.now() / 1000))) {
            res.status(401).json({ name: ApiExceptionNameEnum.EXPIRED_TOKEN, message: "Expired token" })
            return
        }
        req.user = {
            accontType: decoded.accountType,
            id: decoded.id,
            email: decoded.email
        }
        next()
    } catch (ex) {
        if (ex instanceof JsonWebTokenError) {
            res.status(400).json({ name: "Invalid token used", message: "The signature used doesn't match the one used on the application. " })
        }
        console.log(ex)
        res.status(400).json({ message: "Invalid or expired token" })
    }
}
export default EnsureAuthenticatedUserMiddleware