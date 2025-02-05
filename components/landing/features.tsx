import { ShieldCheck, Rocket, Database, Paintbrush } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Type-Safe Development",
    description: "End-to-end type safety with TypeScript and Drizzle ORM",
    icon: ShieldCheck,
  },
  {
    title: "Modern Stack",
    description:
      "Built with Next.js 14, featuring server components and app router",
    icon: Rocket,
  },
  {
    title: "Database & Auth",
    description: "Powered by Supabase for reliable database and authentication",
    icon: Database,
  },
  {
    title: "Beautiful UI",
    description: "Styled with Tailwind CSS and Shadcn UI components",
    icon: Paintbrush,
  },
];

export default function Features() {
  return (
    <section id="features">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built-in Functionality
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {feature.icon && (
                    <feature.icon className="w-5 h-5 text-primary" />
                  )}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
