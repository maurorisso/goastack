import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { NextStep } from "./types";

interface NextStepsProps {
  steps: NextStep[];
}

export function NextSteps({ steps }: NextStepsProps) {
  return (
    <div id="next-steps" className="scroll-mt-12 pt-16">
      <h2 className="text-3xl font-bold mb-8">Next Steps</h2>
      <p className="text-muted-foreground mb-8">
        Now that you have your project set up, here are some next steps to help
        you build your application.
      </p>
      <div className="flex flex-col gap-6">
        {steps.map((section, index) => (
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
                  {section.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.description}
                    </p>
                  )}
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
  );
}
