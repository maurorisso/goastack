"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export function EnvCheck() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Environment Configuration Required</AlertTitle>
        <AlertDescription>
          <div className="mt-2">
            <p>Please configure your Supabase environment variables:</p>
            <ol className="list-decimal ml-4 mt-2">
              <li>
                Copy <code>.env.example</code> to <code>.env</code>
              </li>
              <li>
                Create a Supabase project at{" "}
                <a
                  href="https://app.supabase.com"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://app.supabase.com
                </a>
              </li>
              <li>
                Update the values in <code>.env</code> with your project
                credentials from the Supabase dashboard
              </li>
              <li>Restart your Next.js development server</li>
            </ol>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
