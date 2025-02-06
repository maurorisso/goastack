# GoaStack

A modern full-stack web development template optimized for scalability, maintainability, and developer experience. Optimized for Cursor IDE, as it includes a **.cursorrules** file to enhance AI-powered suggestions.

## Tech Stack

- **Next.js** – The latest version, leveraging server components, App Router, and best practices
- **Tailwind CSS** – For utility-first, responsive styling
- **TypeScript** – Ensuring type safety and enhanced developer tooling
- **Supabase** – Acting as the backend for authentication (Supabase Auth) and database management (PostgreSQL)
- **Drizzle ORM** – For type-safe and efficient database interactions
- **ShadCN UI** – For beautifully styled, accessible UI components

## Project Setup

1. Clone the repository:

```bash
git clone https://github.com/maurorisso/goastack.git
```

2. Navigate to the project directory:

```bash
cd goastack
```

3. Install dependencies:

```bash
npm install
```

4. Create Supabase Project:

   - Create a new project at [Supabase Dashboard](https://supabase.com/dashboard/new) and save your database password
   - Copy your project reference ID from the URL

5. Environment Variables Setup:

   - Rename `.env.example` to `.env.local`:
     ```bash
     mv .env.example .env.local
     ```
   - Configure Environment Variables in `.env.local`:

     Project URL and Anon Key (from [Project Settings](https://supabase.com/dashboard/project/[your-project-ref]/settings/)):

     ```bash
     # Project URL
     NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co

     # Anon Key
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

     Database Connection (from [Database Settings](https://supabase.com/dashboard/project/[your-project-ref]/settings/database?showConnect=true)):

     ```bash
     # Connection String
     # Use Transaction Pooler
     # Replace [YOUR-PASSWORD] by your database password
     DB_CONNECTION_STRING=your-connection-string
     ```

## Next Steps

### Project Customization

#### IDE Setup

- Add your project context to `.cursorrules` if using Cursor IDE

#### Project Cleanup

- Delete the `/docs` folder after setting up your documentation
- Modify components under `components/landing` for your project

### Drizzle ORM

#### Schema Setup

- Explore default schemas in `db/schemas` (`user.ts` and `todo.ts`)
- Create new schema files under `db/schemas` for your tables

#### Database Management

- Run `npm run generate` to generate the migrations
- Run `npm run migrate` to apply changes to Supabase
- Use generated types in your server actions

### Authentication

#### Initial Setup

- Head over to the Sign up page and sign up your first user
- Configure authentication providers in Supabase dashboard

#### Email Configuration

- Add custom `SMTP` provider to send emails

### UI Components

#### Component Library

- Use ShadCN components for consistent design, all components are already installed by default in `/components/ui`

## License

[MIT License](LICENSE)
