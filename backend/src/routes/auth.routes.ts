import { Request, Response, Router } from 'express'
import passport from '../services/auth.service'

export const router = Router();
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    })
)

router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: '/auth/failed'
    }),
    (req: Request, res: Response) => {

        const { token, user } = req.user as any;
        res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}&name=${user.name}&email=${user.email}`)
    }
)

router.get('/failed', (req: Request, res: Response) => {
    res.json({
        message: 'Google Login failed, try Again'
    })
})

