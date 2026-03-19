import dotenv from 'dotenv'
dotenv.config()

import jwt from "jsonwebtoken";
import { Request, Response , NextFunction} from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{

    try {

        const token = req.headers.authorization?.split(" ")[1]
        console.log("Token: ", token)

        if (!token) {

            res.status(401).json({"message": "Token Not Found"})
        }else{
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
            (req as any).userId = (decoded as any).userId
            next()

        }

    } catch (error) {
        res.status(401).json({"message": "Invalid Token"})
    }

}