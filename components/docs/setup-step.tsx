import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Check, Copy, ArrowRight } from "lucide-react";
import { Step } from "./types";

interface SetupStepProps {
  step: Step;
  index: number;
  isCompleted: boolean;
  onToggle: () => void;
  copiedIndex: string | number | null;
  onCopy: (text: string, index: string | number) => void;
  projectRef: string;
  onProjectRefChange: (value: string) => void;
}

export function SetupStep({
  step,
  index,
  isCompleted,
  onToggle,
  copiedIndex,
  onCopy,
  projectRef,
  onProjectRefChange,
}: SetupStepProps) {
  const getFormattedValue = (value: string) => {
    return value.replace(
      /\[your-project-ref\]/g,
      projectRef || "[your-project-ref]"
    );
  };

  return (
    <Card
      className={`bg-background border-none shadow-none ${
        isCompleted ? "opacity-60" : ""
      } ${step.isSubStep ? "ml-3 md:ml-6" : ""}`}
    >
      <CardContent className="p-2 md:p-3">
        <div className="flex items-start gap-2 md:gap-3">
          <Checkbox
            id={`step-${index}`}
            className="mt-0.5 border-foreground/20 bg-background data-[state=checked]:bg-background data-[state=checked]:text-green-500 data-[state=checked]:border-green-500"
            checked={isCompleted}
            onCheckedChange={onToggle}
          />
          <div className="space-y-1 md:space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-col gap-1 md:gap-1.5">
              <label
                htmlFor={`step-${index}`}
                className={`text-xs ${step.isSubStep ? "" : "font-medium"} cursor-pointer`}
              >
                {step.description}
              </label>
              {step.command && !step.subSteps && (
                <div className="bg-card py-1.5 md:py-2 px-2 md:px-3 rounded-md text-xs overflow-x-auto flex justify-between items-center gap-2">
                  <code className="flex-1 whitespace-nowrap">
                    {step.command}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => onCopy(step.command!, index)}
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
                <div className="space-y-2 md:space-y-3 text-xs pl-1 border-l border-muted ml-1 mt-2">
                  {step.subSteps.map((subStep, subIndex) => (
                    <div
                      key={subIndex}
                      className="space-y-1.5 md:space-y-2 pl-2 md:pl-3"
                    >
                      {subStep.text && (
                        <p className="text-muted-foreground">{subStep.text}</p>
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
                          <div className="bg-card py-1.5 md:py-2 px-2 md:px-3 rounded-md overflow-x-auto flex-1">
                            <pre className="whitespace-pre text-muted-foreground text-xs">
                              {getFormattedValue(subStep.value)}
                            </pre>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0 mt-1"
                            onClick={() =>
                              subStep.value &&
                              onCopy(
                                getFormattedValue(subStep.value),
                                `${index}-${subIndex}`
                              )
                            }
                          >
                            {copiedIndex === `${index}-${subIndex}` ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
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
  );
}
