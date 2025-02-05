"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  CheckIcon,
  CopyIcon,
  Github,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [copied, setCopied] = useState(false);
  const repoUrl = "https://github.com/maurorisso/goastack.git";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`git clone ${repoUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex flex-col gap-8 items-center ">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold sm:text-6xl !text-white mb-8">
          Goa Stack
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
          A modern full-stack template for building robust web applications with
          TypeScript, Shadcn, Next.js, Supabase, and Drizzle ORM.
        </p>
      </div>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs">
            <BookOpen className="w-4 h-4" />
            Read the Docs
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="https://github.com/maurorisso/goastack">
            <Github className="w-4 h-4" />
            GitHub
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-2 bg-card rounded-md px-4 py-2  text-sm">
        <div>git clone https://github.com/maurorisso/goastack.git</div>
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
