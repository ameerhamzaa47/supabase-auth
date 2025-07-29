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
