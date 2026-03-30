import { Request, Response, Router } from "express";
import fetchUserData from "../services/github.service";
import { analyzeWithAI } from "../services/ai.services";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Prisma, PrismaClient } from "@prisma/client";

export const router = Router();

router.post('/analyze', authMiddleware, async (req: Request, res: Response) => {
    try {

        const { username } = req.body;
        if (!username) {
            res.status(400).json({
                message: "UserName not found",
            })
            return;
        }

        const data = await fetchUserData(username)

        const aiResult = await analyzeWithAI(data);

        const prisma = new PrismaClient()

        await prisma.analyses.create({
            data: {
                userId: (req as any).userId,
                githubUserName: username,
                score: aiResult.ratings.overall,
                feedback: aiResult as any,
            }
        })
        res.json({
            message: "AI Generated Report",
            data,
            aiResult,
        })



    } catch (error) {
        console.error("ANALYZE ERROR:", error)  // yeh add karo
        res.status(500).json({ message: "Failed ", error })
    }
})

