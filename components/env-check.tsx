"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, FileInput } from "lucide-react";
import { useEffect, useState } from "react";

export function EnvCheck({ children }: { children: React.ReactNode }) {
  const [isUsingEnvExample, setIsUsingEnvExample] = useState(false);

  useEffect(() => {
    // Check if we're using .env.example values (they will have placeholders)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isExample =
      !supabaseUrl ||
      supabaseUrl.includes("[your-project-ref]") ||
      supabaseUrl === "your-project-url";

    setIsUsingEnvExample(isExample);
  }, []);

  if (isUsingEnvExample) {
    return (
      <div className="container max-w-5xl py-12">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Environment Setup Required</AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-4">
              <div className="flex items-start gap-2">
                <FileInput className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium">
                    You are using the example environment file.
                  </p>
                  <p className="text-sm mt-1">Please follow these steps:</p>
                </div>
              </div>

              <div className="pl-7 space-y-3">
                <div>
                  <p className="text-sm font-medium">
                    1. Rename the environment file:
                  </p>
                  <code className="bg-background/30 px-2 py-1 rounded-md text-sm mt-1 block">
                    mv .env.example .env.local
                  </code>
                </div>

                <div>
                  <p className="text-sm font-medium">
                    2. Update the variables in .env.local with your Supabase
                    project values:
                  </p>
                  <a
                    href="https://supabase.com/dashboard/project/_/settings/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center gap-1 mt-1"
                  >
                    Find your project values here
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return children;
}
