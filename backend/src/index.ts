import dotenv from 'dotenv';
dotenv.config()

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import {router as authRouter}  from './routes/auth.routes';
import {router as analyzeRouter}  from './routes/analyze.routes';
import passport from 'passport';

const PORT = process.env.PORT || 5000;
const app: Application = express();

app.use(express.json());
app.use(passport.initialize())
app.use(cors());


app.use('/auth', authRouter)

app.use('/api', analyzeRouter)

app.get('/', (req: Request, res: Response) => {
    res.json({"message": "API is Healthy"})
})


app.get('/api/health', (req: Request, res: Response) => {
    res.json({
        "message": "API is Healthy",
        "time": new Date().toISOString(),
    })
})
app.listen(PORT, () => {
    console.log("Server Running on 5000")
})