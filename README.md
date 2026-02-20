# Medium
A full-stack blogging platform built with TypeScript, React, Tailwind CSS, PostgreSQL, Prisma, Hono, and a serverless backend architecture.

Live URL:
https://medium-shreyanshxrai.vercel.app/

If accessing via mobile, please enable Desktop Site for the best experience.

Tech Stack

Frontend:

React (TypeScript)

Tailwind CSS

Vite

JWT-based Authentication

Backend (Serverless):

Hono

TypeScript

Prisma ORM

PostgreSQL

Cloudflare Workers (Serverless Deployment)

Features

User Signup and Login (JWT Authentication)

Create and Publish Blog Posts

View All Blogs

Author–Post Relationship using Prisma

Serverless REST API

Deployed Frontend and Backend

Architecture

Client (React + TypeScript)
↓
Serverless API (Hono)
↓
Prisma ORM
↓
PostgreSQL

Project Structure

/frontend
/backend

Frontend handles UI and client-side routing.
Backend exposes REST endpoints using Hono and connects to PostgreSQL via Prisma.

Environment Variables

Backend:
DATABASE_URL=
JWT_SECRET=
ACCELERATE_URL=

Frontend:
VITE_BACKEND_URL=

Local Development

Backend:

cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev

Frontend:

cd frontend

npm install

npm run dev

Key Implementation Details

Type-safe API layer using TypeScript

Relational schema modeling with Prisma

JWT stored on client and validated in middleware

CORS handling for cross-origin deployment

Serverless deployment for scalable backend execution

Future Improvements

Rich text editor

Pagination

Comments system

Rate limiting

Profile pages

Author

Shreyansh Rai
B.Tech (Information Technology)
