
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
})

export const sendEmail = async (name: string, email: string) => {

    const mail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to Dev Portfolio Analyzer! 🚀",
        html: `
            <h1>Welcome, ${name}! 👋</h1>
            <p>We're excited to have you on board.</p>
            <p>You can now analyze any GitHub profile and get AI-powered feedback.</p>
            <br/>
            <p>Happy Coding! 💻</p>
    `
    }
    await transporter.sendMail(mail)
}
