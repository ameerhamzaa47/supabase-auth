# Next.js Supabase Auth App

A simple authentication app built with **Next.js**, **Tailwind CSS**, and **Supabase**.  
Includes email-based sign-in, protected routes, and automatic redirection after email confirmation.

---

## ✨ Features

- 🔐 Email/password authentication with Supabase
- ✅ Email confirmation with redirect handling
- 🔒 Protected routes (middleware-based)
- 🎨 Styled with Tailwind CSS
- ⚡ Deployed on Vercel

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) for deployment

---

## 🔧 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ameerhamzaa47/supabase-auth
cd supabase-auth

2. Install dependencies

npm install
# or
yarn install


NEXT_PUBLIC_SUPABASE_URL=https://xoaviixgmtshuuliugtr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvYXZpaXhnbXRzaHV1bGl1Z3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTk2NzAsImV4cCI6MjA2OTM3NTY3MH0.kbptfbg4tn1mTtaJExVwlMsACcEzY0Nt0hC0v1rVTQ8
You can find these in your Supabase project's dashboard under Settings > API.

🚀 Running the App Locally

npm run dev
🔒 Protected Routes
This project uses middleware or server-side logic to protect certain routes.
Unauthenticated users trying to access these pages are redirected to the login page.

After confirming their email via Supabase, users are automatically redirected to the appropriate page based on your auth logic.

You can adjust the redirect path in your auth callback logic (/auth/callback).