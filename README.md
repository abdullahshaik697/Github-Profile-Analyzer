# 🚀 GitHub Profile Analyzer — AI-Powered Developer Portfolio Review

> *Ever wondered how strong your GitHub profile really is? This app tells you — with AI.*

---

## 📖 What is This Project?

**GitHub Profile Analyzer** is a full-stack web application that takes any GitHub username, fetches their public profile data, and uses **Artificial Intelligence** to generate a detailed, honest, and actionable review of their developer portfolio.

Think of it as a **career coach for developers** — it looks at your GitHub, understands your strengths and weaknesses, gives you a score out of 10 for different areas, and tells you exactly what to improve.

### What does it actually do?

1. You log in with your Google account (safe and secure)
2. You type any GitHub username
3. The app fetches that person's repositories, languages, stars, followers, and more
4. An AI model (LLaMA 3) analyzes all that data
5. You get a beautiful, detailed report — with scores, strengths, improvements, and a personal recommendation
6. The analysis is saved to the database so you can refer back to it
7. A welcome email is sent to new users automatically

---

## ✨ Features

- 🔐 **Google OAuth Login** — No passwords to remember. Login with one click using your Google account.
- 🐙 **GitHub Data Fetching** — Pulls real-time data directly from the GitHub API.
- 🤖 **AI Analysis** — LLaMA 3.3 (via Groq) analyzes your portfolio and gives structured feedback.
- 📊 **Detailed Scoring** — Get rated out of 10 on: Languages, Projects, Social Presence, Consistency, and Code Quality.
- 💾 **Persistent Storage** — All analyses are saved in a cloud PostgreSQL database (NeonDB).
- 📧 **Automated Emails** — Welcome email sent to every new user via Nodemailer.
- ⚡ **Fast & Modern Stack** — Built with TypeScript on both frontend and backend for reliability and type safety.

---

## 🛠️ Tech Stack — What We Used & Why

### Backend

####  - Node.js + Express

####  - Prisma ORM

####  - NeonDB (PostgreSQL)

####  - JWT (JSON Web Tokens)

####  - Nodemailer

####  - Passport.js + Google OAuth 2.0
**What it is:** Passport.js is an authentication middleware for Node.js. Google OAuth 2.0 is Google's system that lets users log in to third-party apps using their Google account.

**Why we used it:** Building a login system from scratch is complex and risky. Google OAuth is battle-tested, secure, and gives users a familiar one-click login experience. Passport.js makes integrating it into Express very straightforward.

####  - Groq API + LLaMA 3.3
**What it is:** Groq is a platform that provides extremely fast inference for open-source AI models. LLaMA 3.3 is Meta's powerful open-source language model — comparable to GPT-4 but completely free.

#### GitHub API
**What it is:** GitHub's official API that lets us programmatically fetch public data about any GitHub user.

**Why we used it:** It gives us structured, real-time data — repositories, languages, stars, followers, bios, and more. This is the raw material that the AI analyzes.

---

### Frontend

#### React + TypeScript

#### Redux Toolkit

#### React Router DOM

#### Axios

#### Vite

---

## What the AI does:##
- Reads the GitHub profile data
- Determines primary programming language
- Assesses skill level (Beginner / Intermediate / Expert)
- Rates 5 different areas out of 10
- Lists strengths and areas for improvement
- Writes a personalized recommendation

---

## 🏗️ Project Architecture

```
github_profile_analyzer/
│
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   │   └── auth.middleware.ts   # JWT verification
│   │   ├── routes/
│   │   │   ├── auth.routes.ts       # Google OAuth routes
│   │   │   └── analyze.routes.ts    # Analysis endpoint
│   │   ├── services/
│   │   │   ├── auth.service.ts      # Passport + Google Strategy
│   │   │   ├── github.service.ts    # GitHub API calls
│   │   │   ├── ai.service.ts        # Groq + LLaMA analysis
│   │   │   └── email.service.ts     # Nodemailer welcome email
│   │   └── index.ts                 # Express server entry point
│   ├── prisma/
│   │   └── schema.prisma            # Database models
│   └── .env                         # Environment variables (never commit!)
│
└── frontend/                   # React + TypeScript SPA
    ├── src/
    │   ├── pages/
    │   │   ├── Login.tsx            # Google login page
    │   │   └── Dashboard.tsx        # Main analysis page
    │   ├── store/
    │   │   ├── authSlice.ts         # Redux auth state
    │   │   └── index.ts             # Redux store setup
    │   ├── components/              # (reusable UI components)
    │   ├── services/                # (API service functions)
    │   ├── types/                   # TypeScript interfaces
    │   ├── App.tsx                  # Routes configuration
    │   └── main.tsx                 # React app entry point
    └── vite.config.ts
```

---

## 🔄 How It All Works Together

```
┌─────────────┐     1. Login with Google      ┌─────────────────┐
│   Browser   │ ─────────────────────────────▶ │  Backend API    │
│  (React)    │                                │  (Express)      │
│             │ ◀───────────────────────────── │                 │
│             │     2. JWT Token returned      │                 │
│             │                                │                 │
│             │     3. Analyze GitHub user     │                 │
│             │ ─────────────────────────────▶ │                 │
│             │        (with JWT token)        │                 │
│             │                                │  ┌──────────┐  │
│             │                                │  │ GitHub   │  │
│             │                                │  │   API    │  │
│             │                                │  └──────────┘  │
│             │                                │       ↓        │
│             │                                │  ┌──────────┐  │
│             │                                │  │  Groq AI │  │
│             │                                │  │ (LLaMA3) │  │
│             │                                │  └──────────┘  │
│             │                                │       ↓        │
│             │                                │  ┌──────────┐  │
│             │                                │  │  NeonDB  │  │
│             │                                │  │(Postgres)│  │
│             │                                │  └──────────┘  │
│             │     4. AI Analysis Result      │                 │
│             │ ◀───────────────────────────── │                 │
└─────────────┘                                └─────────────────┘
```

---

## 🔐 Security Approach

- **No passwords stored** — We use Google OAuth, so we never touch passwords
- **JWT tokens** — Short-lived tokens (7 days) for API authentication
- **Environment variables** — All secrets (API keys, DB URLs) stored in `.env`, never committed to Git
- **Auth middleware** — Every protected route verifies the JWT before processing

---

## 📦 All Dependencies

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| express | latest | Web framework |
| typescript | latest | Type safety |
| prisma | v5 | Database ORM |
| passport | latest | Authentication middleware , Google OAuth|
| jsonwebtoken | latest | JWT creation & verification |
| groq-sdk | latest | Groq AI API client |
| axios | latest | HTTP requests to GitHub API |
| nodemailer | latest | Sending emails |
| dotenv | latest | Environment variable management |
| cors | latest | Cross-Origin Resource Sharing |
| nodemon | latest | Auto-restart on file changes |

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| react | latest | UI framework |
| typescript | latest | Type safety |
| vite | latest | Build tool & dev server |
| react-redux | latest | React bindings for Redux , State Management |
| react-router-dom | latest | Client-side routing |
| axios | latest | API calls to backend |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- A Google Cloud account (for OAuth credentials)
- A NeonDB account (free at neon.tech)
- A Groq account (free at console.groq.com)
- A GitHub account (for personal access token)

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/github-profile-analyzer.git

# 2. Go to backend folder
cd backend

# 3. Install dependencies
npm install

# 4. Create .env file
cp .env.example .env
# Fill in your credentials

# 5. Run database migrations
npx prisma migrate dev

# 6. Start the server
npm run dev
```

### Frontend Setup

```bash
# 1. Go to frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_neondb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_super_secret_key
GITHUB_TOKEN=your_github_personal_access_token
GROQ_API_KEY=your_groq_api_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

---

## 💪 Project Strengths

### Why This Project Stands Out

1. **Real AI Integration** — Not a fake "AI" that just shows random scores. Uses actual LLaMA 3.3, one of the most capable open-source language models available.

2. **Full TypeScript** — Both frontend and backend are written in TypeScript. This demonstrates understanding of type safety, interfaces, and modern development practices.

3. **Production-Ready Patterns** — JWT authentication, middleware architecture, environment variables, database migrations — all patterns used in real production applications.

4. **Clean Architecture** — Separation of concerns: routes, services, middleware are all separate. Adding new features is easy and doesn't break existing code.

5. **Modern Tech Stack** — Every technology used (React, Redux Toolkit, Prisma, NeonDB, Vite) is current and in-demand in the job market.

6. **Practical Value** — This isn't a todo app. It solves a real problem developers face: understanding how their GitHub profile looks to recruiters and employers.

---

## 🎯 What I Learned Building This

- How to set up a full TypeScript backend with Express from scratch
- How OAuth 2.0 authentication works in detail
- How to work with PostgreSQL databases using Prisma ORM
- How to integrate AI APIs and parse structured responses
- How to manage global state in React with Redux Toolkit
- How JWT tokens work and why they're used for API authentication
- How to structure a large full-stack project cleanly
- How to connect a React frontend to a Node.js backend securely

---

## 👨‍💻 Author

**Abdullah Shaikh**
- GitHub: [@abdullahshaik697](https://github.com/abdullahshaik697)
- Student of Software Engineering
- Passionate about Web Development & AI Integration

---