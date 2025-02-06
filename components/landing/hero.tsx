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
    <div className="flex flex-col gap-4 md:gap-8 items-center px-4 md:px-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold !text-white mb-4 md:mb-8">
          Goa Stack
        </h1>
        <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2">
          A modern full-stack template for building robust web applications with
          TypeScript, Shadcn, Next.js, Supabase, and Drizzle ORM.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
        <Button asChild className="w-full sm:w-auto">
          <Link href="/docs">
            <BookOpen className="w-4 h-4 mr-2" />
            Read the Docs
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="https://github.com/maurorisso/goastack">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2 bg-card rounded-md px-2 sm:px-4 py-2 text-xs sm:text-sm mx-auto w-full sm:w-auto overflow-x-auto">
        <code className="whitespace-nowrap">
          git clone https://github.com/maurorisso/goastack.git
        </code>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="flex-shrink-0"
        >
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
