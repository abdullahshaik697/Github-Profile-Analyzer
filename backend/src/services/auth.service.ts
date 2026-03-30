import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { sendEmail } from "./email.service";

const prisma = new PrismaClient();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await prisma.user.findUnique({
                    where: { googleId: profile.id },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            googleId: profile.id,
                            email: profile.emails![0].value,
                            name: profile.displayName,
                        }
                    })
                    sendEmail(profile.displayName, profile.emails![0].value)
                }

                const token = jwt.sign(
                    { userId: user.id },
                    process.env.JWT_SECRET!,
                    { expiresIn: '7d' }
                );

                return done(null, { user, token })
            } catch (error) {


                return done(error, undefined)
            }

        }
    )
)

export default passport