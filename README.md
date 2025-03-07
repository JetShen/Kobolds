# Enterprise Web Application

A modern enterprise web application built with Next.js 13+ and the App Router.

## Features

- **Authentication & Authorization**: Secure login system with role-based access control
- **Dashboard**: Real-time analytics and KPIs
- **Task Management**: Kanban board with task tracking
- **Team Management**: Create and manage teams and sectors
- **Responsive Design**: Works on all devices

## Tech Stack

- **Frontend**: Next.js 13+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/app`: Next.js App Router pages and layouts
- `/components`: Reusable UI components
- `/lib`: Utility functions and shared code
- `/prisma`: Database schema and migrations
- `/public`: Static assets

## User Roles

### Admin
- Full access to all features
- Manage companies, teams, and users
- View all analytics and reports

### Manager
- Manage team members and tasks
- Create and assign tasks
- View team analytics

### Employee
- View and update assigned tasks
- Track time spent on tasks
- Collaborate with team members

## Default Login Credentials

- **Admin**: admin@example.com / password123
- **Manager**: manager@example.com / password123
- **Employee**: employee@example.com / password123

## License

This project is licensed under the MIT License.