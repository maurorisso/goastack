import React from "react";
import { SidebarSection, Step, NextStep } from "../../components/docs/types";
import { HighlightedPath, CommandText } from "@/components/docs/content";

export const sidebarItems: SidebarSection = {
  "Getting Started": [
    {
      title: "Project Setup",
      href: "#setup",
    },
  ],
  "Next Steps": [
    {
      title: "Project Customization",
      href: "#project-customization",
    },
    {
      title: "Drizzle ORM",
      href: "#drizzle-orm",
    },
    {
      title: "Authentication",
      href: "#authentication",
    },
    {
      title: "UI Components",
      href: "#ui-components",
    },
  ],
};

export const setupSteps: Step[] = [
  {
    command: "git clone https://github.com/maurorisso/goastack.git",
    description: "Clone the repository",
    type: "command",
  },
  {
    command: "cd goastack",
    description: "Navigate to the project directory",
    type: "command",
  },
  {
    command: "npm install",
    description: "Install dependencies",
    type: "command",
  },
  {
    description: "Create Supabase Project",
    type: "info",
    subSteps: [
      {
        text: "1. Create a new project and save your database password",
        url: "https://supabase.com/dashboard/new",
      },
      {
        text: "2. Copy your project reference ID from the URL:",
        input: true,
      },
    ],
  },
  {
    description: "Environment Variables Setup",
    type: "info",
  },
  {
    command: "mv .env.example .env.local",
    description: "1. Rename .env.example to .env.local",
    type: "command",
    isSubStep: true,
  },
  {
    description: "2. Configure Environment Variables to .env.local",
    type: "info",
    isSubStep: true,
    subSteps: [
      {
        url: "https://supabase.com/dashboard/project/[your-project-ref]/settings/",
        text: "Project URL and Anon Key",
        value:
          "# Project URL\nNEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co\n\n# Anon Key\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key",
      },
      {
        text: "Database Connection",
        url: "https://supabase.com/dashboard/project/[your-project-ref]/settings/database?showConnect=true",
        value:
          "# Connection String \n# Use Transaction Pooler \n# Replace [YOUR-PASSWORD] by your database password\nDB_CONNECTION_STRING=your-connection-string ",
      },
    ],
  },
];

export const nextSteps: NextStep[] = [
  {
    title: "Project Customization",
    steps: [
      {
        title: "IDE Setup",
        items: [
          [
            "Add your project context to ",
            <HighlightedPath key="cursor-rules">.cursorrules</HighlightedPath>,
            " if using Cursor IDE",
          ],
        ],
      },
      {
        title: "Project Cleanup",
        items: [
          [
            "Delete the ",
            <HighlightedPath key="docs-folder">/docs</HighlightedPath>,
            " folder after setting up your documentation",
          ],
          [
            "Modify components under ",
            <HighlightedPath key="landing-path">
              components/landing
            </HighlightedPath>,
            " for your project",
          ],
        ],
      },
    ],
  },
  {
    title: "Drizzle ORM",
    steps: [
      {
        title: "Schema Setup",
        items: [
          [
            "Explore default schemas in ",
            <HighlightedPath key="schema-path">db/schemas</HighlightedPath>,
            " (",
            <HighlightedPath key="schema-files">user.ts</HighlightedPath>,
            " and ",
            <HighlightedPath key="schema-files-2">todo.ts</HighlightedPath>,
            ")",
          ],
          [
            "Create new schema files under ",
            <HighlightedPath key="schema-path-2">db/schemas</HighlightedPath>,
            " for your tables",
          ],
        ],
      },
      {
        title: "Database Management",
        items: [
          [
            "Run ",
            <CommandText key="generate-cmd">npm run generate</CommandText>,
            " to generate the migrations",
          ],
          [
            "Run ",
            <CommandText key="migrate-cmd">npm run migrate</CommandText>,
            " to apply changes to Supabase",
          ],
          "Use generated types in your server actions",
        ],
      },
    ],
  },
  {
    title: "Authentication",
    description: "Set up authentication with Supabase Auth",
    steps: [
      {
        title: "Initial Setup",
        items: [
          "Head over to the Sign up page and sign up your first user.",
          "Configure authentication providers in Supabase dashboard",
        ],
      },
      {
        title: "Email Configuration",
        items: [
          [
            "Add custom ",
            <HighlightedPath key="smtp">SMTP</HighlightedPath>,
            " provider to send emails",
          ],
        ],
      },
    ],
  },
  {
    title: "UI Components",
    description: "Build your user interface with ShadCN and Tailwind",
    steps: [
      {
        title: "Component Library",
        items: [
          [
            "Use ShadCN components for consistent design, all components are already installed by default in ",
            <HighlightedPath key="ui-path">/components/ui</HighlightedPath>,
          ],
        ],
      },
    ],
  },
];
