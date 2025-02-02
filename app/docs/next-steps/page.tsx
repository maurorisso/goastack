"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const nextSteps = [
  {
    title: "Authentication",
    description: "Set up authentication with Supabase Auth",
    steps: [
      "Configure authentication providers in Supabase dashboard",
      "Use the provided auth hooks for user management",
      "Implement protected routes and middleware",
    ],
  },
  {
    title: "Drizzle ORM",
    description: "Design and implement your database schema",
    steps: [
      "Create tables using Drizzle migrations",
      "Define relationships between tables",
      "Set up database indexes and constraints",
    ],
  },
  {
    title: "API Routes",
    description: "Build your API endpoints",
    steps: [
      "Create server actions for data operations",
      "Implement error handling and validation",
      "Set up rate limiting and security measures",
    ],
  },
  {
    title: "UI Components",
    description: "Build your user interface",
    steps: [
      "Use ShadCN components for consistent design",
      "Implement responsive layouts with Tailwind CSS",
      "Create reusable custom components",
    ],
  },
];

export default function NextStepsPage() {
  return (
    <main className="py-12 bg-background">
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Next Steps</h1>
        <p className="text-muted-foreground mb-8">
          Now that you have your project set up, here are some next steps to
          help you build your application.
        </p>
        <div className="space-y-6">
          {nextSteps.map((section, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.description}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {section.steps.map((step, stepIndex) => (
                      <li
                        key={stepIndex}
                        className="text-sm flex items-start gap-2"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
