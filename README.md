# Next.js Prisma CRUD Example

This is an example of a CRUD (Create, Read, Update, Delete) application built with [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io/), and [Tailwind CSS](https://tailwindcss.com/).

This application demonstrates how to use Next.js App Router with Server Actions to perform CRUD operations on a `Post` model.

## Features

- Create, Read, Update, and Delete posts
- Built with Next.js App Router
- Uses Server Actions for data mutations
- Styling with Tailwind CSS and [shadcn/ui](https://ui.shadcn.com/)
- Database ORM with Prisma
- Uses SQLite for the database

## Database Schema

The application uses a simple `Post` model defined in `prisma/schema.prisma`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 20.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### 1. Clone the repository

```bash
git clone https://github.com/yuuuuu-z/nextjs-prisma-crud.git
cd nextjs-prisma-crud
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

This project uses SQLite. Prisma will automatically create the `dev.db` file for you.

Run the following command to apply the database schema:

```bash
npx prisma migrate dev
```

This command will also generate the Prisma Client based on your schema.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
