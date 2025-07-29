## Supabase Authentication

This project integrates [Supabase](https://supabase.com/) authentication with a Next.js application. Supabase provides a backend-as-a-service with authentication, database, and storage features.

### Features

- Email/password authentication using Supabase Auth
- Secure session management
- Example sign up, sign in, and sign out flows
- Easily extendable for social logins

## Setup Supabase

1. [Create a Supabase project](https://app.supabase.com/).
2. Go to the "Project Settings" > "API" section and copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
3. Create a `.env.local` file in your project root:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4. Install the Supabase client:

    ```bash
    npm install @supabase/supabase-js
    ```

## Usage

- Update authentication logic in your components/pages as needed.
- Refer to the [Supabase Auth docs](https://supabase.com/docs/guides/auth) for advanced usage.

## Example Auth Usage

```ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Sign up
await supabase.auth.signUp({ email, password });

// Sign in
await supabase.auth.signInWithPassword({ email, password });

// Sign out
await supabase.auth.signOut();
```

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Quickstart](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
- [Next.js + Supabase Example](https://github.com/vercel/next.js/tree/canary/examples/with-supabase)


## Project Summary

This project demonstrates how to integrate Supabase authentication into a Next.js application, providing a robust and scalable authentication solution. Supabase acts as the backend, offering authentication, database, and storage services, while Next.js serves as the frontend framework.

The core functionality centers around implementing secure email/password authentication using Supabase Auth. The project includes example flows for user sign up, sign in, and sign out, ensuring secure session management throughout the user experience. The authentication logic is modular and can be easily extended to support additional authentication providers, such as social logins (Google, GitHub, etc.), by leveraging Supabase's built-in support.

Setup instructions guide users through creating a Supabase project, configuring environment variables, and installing the necessary client library. The provided code snippets illustrate how to initialize the Supabase client and perform basic authentication operations within a Next.js environment.

This project serves as a practical starting point for developers looking to add authentication to their Next.js applications using Supabase. It emphasizes security, extensibility, and ease of integration, making it suitable for both prototyping and production use. Additional resources and documentation links are included to help users explore advanced features and best practices.

## Environment Variables

This project supports both `.env.local` and `.env` files for environment variable configuration. You can define your Supabase credentials in either file, depending on your workflow and deployment requirements. For example:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Ensure that sensitive keys are not committed to version control.

## Pages Overview

The application includes several pages demonstrating authentication flows:

- **Sign Up Page:** Allows users to create a new account using email and password.
- **Sign In Page:** Enables existing users to log in securely.
- **Sign Out Functionality:** Lets users end their session.
- **Protected Pages:** Example pages that require authentication to access.

Each page leverages Supabase Auth methods for handling user credentials and session management.

## Folder Structure

```
supabase-auth/
├── pages/
│   ├── index.tsx
│   ├── signup.tsx
│   ├── signin.tsx
│   └── protected.tsx
├── lib/
│   └── supabaseClient.ts
├── .env.local
├── .env
├── README.md
└── package.json
```

- `pages/`: Contains Next.js page components for authentication and protected content.
- `lib/supabaseClient.ts`: Initializes and exports the Supabase client instance.
- `.env.local` / `.env`: Store environment variables for Supabase configuration.

## How the Project Works

1. **Supabase Client Initialization:** The Supabase client is set up in `lib/supabaseClient.ts` using environment variables.
2. **Authentication Flows:** Pages like `signup.tsx` and `signin.tsx` use Supabase Auth methods to handle user registration and login.
3. **Session Management:** The app manages user sessions securely, allowing users to sign in, stay authenticated, and sign out.
4. **Protected Routes:** Certain pages check for an active session and restrict access if the user is not authenticated.
5. **Extensibility:** The authentication logic is modular, making it easy to add social logins or other providers supported by Supabase.

This structure ensures a clear separation of concerns and provides a solid foundation for building secure, scalable authentication in Next.js applications.