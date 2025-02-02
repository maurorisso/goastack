import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
export default function Header() {
  return (
    <div className="flex flex-col gap-8 items-center pt-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold sm:text-6xl !text-white">
          Goa Stack
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
          A modern full-stack template for building robust web applications with
          TypeScript, Next.js, Supabase, and Drizzle ORM.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "TypeScript",
            "Next.js",
            "Supabase",
            "Drizzle ORM",
            "Tailwind CSS",
            "Shadcn UI",
          ].map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-sm bg-card px-3 py-1.5 rounded-md"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Read the Docs
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
