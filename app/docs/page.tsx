"use client";

import { Terminal, Copy, Check, Info, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

type Step = {
  command?: string;
  description: string;
  type: "command" | "info";
  subSteps?: {
    text?: string;
    url?: string;
    value?: string;
    input?: boolean;
  }[];
  isSubStep?: boolean;
};

const steps: Step[] = [
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

const nextSteps = [
  {
    title: "Project Customization",
    description: "Clean up and customize the template for your project",
    steps: [
      {
        title: "IDE Setup",
        items: [
          [
            "Add your project context to ",
            <span key="cursor-rules" className="font-bold bg-card rounded-md">
              .cursorrules
            </span>,
            " if using Cursor IDE",
          ],
        ],
      },
      {
        title: "Project Cleanup",
        items: [
          [
            "Delete the ",
            <span key="docs-folder" className="font-bold bg-card  rounded-md">
              /docs
            </span>,
            " folder after setting up your documentation",
          ],
          [
            "Modify components under ",
            <span key="landing-path" className="font-bold bg-card  rounded-md">
              components/landing
            </span>,
            " for your project",
          ],
        ],
      },
    ],
  },
  {
    title: "Drizzle ORM",
    description: "Design and implement your database schema using Drizzle ORM",
    steps: [
      {
        title: "Schema Setup",
        items: [
          [
            "Explore default schemas in ",
            <span
              key="schema-path"
              className="font-bold bg-cardrounded-md"
            >
              db/schemas
            </span>,
            " (",
            <span key="schema-files" className="font-bold bg-cardrounded-md">
              user.ts
            </span>,
            " and ",
            <span key="schema-files-2" className="font-bold bg-cardrounded-md">
              todo.ts
            </span>,
            ")",
          ],
          [
            "Create new schema files under ",
            <span
              key="schema-path-2"
              className="font-bold bg-cardrounded-md"
            >
              db/schemas
            </span>,
            " for your tables",
          ],
        ],
      },
      {
        title: "Database Management",
        items: [
          [
            "Run ",
            <span
              key="generate-cmd"
              className="font-bold bg-muted/50 px-1.5 py-0.5 rounded-md"
            >
              npm run generate
            </span>,
            " to generate the migrations",
          ],
          [
            "Run ",
            <span
              key="migrate-cmd"
              className="font-bold bg-muted/50 px-1.5 py-0.5 rounded-md"
            >
              npm run migrate
            </span>,
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
            <span
              key="smtp"
              className="font-bold bg-cardrounded-md"
            >
              SMTP
            </span>,
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
            <span
              key="ui-path"
              className="font-bold bg-cardrounded-md"
            >
              /components/ui
            </span>,
          ],
        ],
      },
    ],
  },
];

export default function DocsPage() {
  const [copiedIndex, setCopiedIndex] = useState<string | number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState("setup");
  const [projectRef, setProjectRef] = useState("");

  const copyToClipboard = (text: string, index: string | number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getFormattedValue = (value: string) => {
    return value.replace(
      /\[your-project-ref\]/g,
      projectRef || "[your-project-ref]"
    );
  };

  const toggleStep = (index: number) => {
    // Find the Environment Variables Setup index
    const envSetupIndex = steps.findIndex(
      (step) => step.description === "Environment Variables Setup"
    );

    // If we're toggling a substep of Environment Variables
    if (steps[index].isSubStep && index > envSetupIndex) {
      setCompletedSteps((prev) => {
        const newSteps = prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index].sort((a, b) => a - b);

        // Check if both substeps are completed
        const envSubSteps = steps
          .map((step, i) => ({ ...step, index: i }))
          .filter((step) => step.isSubStep && step.index > envSetupIndex);

        const allSubStepsCompleted = envSubSteps.every((step) =>
          newSteps.includes(step.index)
        );

        // Add or remove the parent step based on substeps completion
        if (allSubStepsCompleted && !newSteps.includes(envSetupIndex)) {
          return [...newSteps, envSetupIndex].sort((a, b) => a - b);
        } else if (!allSubStepsCompleted && newSteps.includes(envSetupIndex)) {
          return newSteps.filter((i) => i !== envSetupIndex);
        }

        return newSteps;
      });
    } else if (index === envSetupIndex) {
      // If we're toggling the parent, toggle all children
      setCompletedSteps((prev) => {
        const envSubSteps = steps
          .map((step, i) => ({ ...step, index: i }))
          .filter((step) => step.isSubStep && step.index > envSetupIndex);

        if (prev.includes(index)) {
          // Uncheck parent and all children
          return prev.filter(
            (i) => ![index, ...envSubSteps.map((s) => s.index)].includes(i)
          );
        } else {
          // Check parent and all children
          return [...prev, index, ...envSubSteps.map((s) => s.index)].sort(
            (a, b) => a - b
          );
        }
      });
    } else {
      // Normal toggle for other steps
      setCompletedSteps((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index].sort((a, b) => a - b)
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const setupSection = document.getElementById("setup");
      const nextStepsSection = document.getElementById("next-steps");

      if (setupSection && nextStepsSection) {
        const setupRect = setupSection.getBoundingClientRect();
        const nextStepsRect = nextStepsSection.getBoundingClientRect();

        if (nextStepsRect.top < window.innerHeight / 2) {
          setActiveSection("next-steps");
        } else {
          setActiveSection("setup");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="py-12 bg-background">
      <div className="container max-w-5xl">
        <div id="setup" className="scroll-mt-12">
          <h1 className="text-3xl font-bold mb-8">Project Setup</h1>
          <div className="space-y-8">
            <section>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <Card
                    key={index}
                    className={`bg-background border-none shadow-none ${
                      completedSteps.includes(index) ? "opacity-60" : ""
                    } ${step.isSubStep ? "ml-6" : ""}`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`step-${index}`}
                          className="mt-0.5 border-foreground/20 bg-background data-[state=checked]:bg-background data-[state=checked]:text-green-500 data-[state=checked]:border-green-500"
                          checked={completedSteps.includes(index)}
                          onCheckedChange={() => toggleStep(index)}
                        />
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-col gap-1.5">
                            <label
                              htmlFor={`step-${index}`}
                              className={`text-xs ${
                                step.isSubStep ? "" : "font-medium"
                              } cursor-pointer`}
                            >
                              {step.description}
                            </label>
                            {step.command && !step.subSteps && (
                              <div className="bg-card py-2 px-3 rounded-md text-xs overflow-x-auto flex justify-between items-center gap-2">
                                <code className="flex-1 whitespace-nowrap">
                                  {step.command}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 shrink-0"
                                  onClick={() =>
                                    copyToClipboard(step.command!, index)
                                  }
                                >
                                  {copiedIndex === index ? (
                                    <Check className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            )}
                            {step.subSteps && (
                              <div className="space-y-3 text-xs pl-1 border-l border-muted ml-1 mt-2">
                                {step.subSteps.map((subStep, subIndex) => (
                                  <div
                                    key={subIndex}
                                    className="space-y-2 pl-3"
                                  >
                                    {subStep.text && (
                                      <p className="text-muted-foreground">
                                        {subStep.text}
                                      </p>
                                    )}
                                    {subStep.url && (
                                      <a
                                        href={getFormattedValue(subStep.url)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline inline-flex items-center gap-1"
                                      >
                                        {getFormattedValue(subStep.url)}
                                        <ArrowRight className="h-3 w-3" />
                                      </a>
                                    )}
                                    {subStep.value && (
                                      <div className="flex items-start gap-2">
                                        <div className="bg-card py-2 px-3 rounded-md overflow-x-auto flex-1">
                                          <pre className="whitespace-pre text-muted-foreground">
                                            {getFormattedValue(subStep.value)}
                                          </pre>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6 shrink-0 mt-1"
                                          onClick={() =>
                                            subStep.value &&
                                            copyToClipboard(
                                              getFormattedValue(subStep.value),
                                              `${index}-${subIndex}`
                                            )
                                          }
                                        >
                                          {copiedIndex ===
                                          `${index}-${subIndex}` ? (
                                            <Check className="h-3 w-3 text-green-500" />
                                          ) : (
                                            <Copy className="h-3 w-3" />
                                          )}
                                        </Button>
                                      </div>
                                    )}
                                    {subStep.input && (
                                      <div className="flex items-center gap-2 mt-2">
                                        <Input
                                          placeholder="Enter your Supabase project reference ID (e.g., asicicpya..)"
                                          value={projectRef}
                                          onChange={(e) =>
                                            setProjectRef(e.target.value)
                                          }
                                          className="h-8 text-xs"
                                        />
                                        {projectRef && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setProjectRef("")}
                                            className="h-8 px-2"
                                          >
                                            Clear
                                          </Button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div id="next-steps" className="scroll-mt-12 pt-16">
          <h2 className="text-3xl font-bold mb-8">Next Steps</h2>
          <p className="text-muted-foreground mb-8">
            Now that you have your project set up, here are some next steps to
            help you build your application.
          </p>
          <div className="space-y-6">
            {nextSteps.map((section, index) => (
              <Card
                key={index}
                id={section.title.toLowerCase().replace(/\s+/g, "-")}
                className="scroll-mt-24 border-none shadow-none"
              >
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
                    <div className="space-y-6">
                      {section.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">
                            {step.title}
                          </h4>
                          <ul className="space-y-2 border-l border-muted pl-4">
                            {step.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="text-sm flex items-start gap-2 text-muted-foreground"
                              >
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
