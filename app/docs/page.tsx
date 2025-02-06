"use client";

import { useState } from "react";
import { DocsNavigation } from "@/components/docs/docs-navigation";
import { SetupGuide } from "@/components/docs/setup-guide";
import { NextSteps } from "@/components/docs/next-steps";
import { setupSteps, nextSteps } from "./constants";

export default function DocsPage() {
  const [copiedIndex, setCopiedIndex] = useState<string | number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [projectRef, setProjectRef] = useState("");

  const copyToClipboard = (text: string, index: string | number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleStep = (index: number) => {
    // Find the Environment Variables Setup index
    const envSetupIndex = setupSteps.findIndex(
      (step) => step.description === "Environment Variables Setup"
    );

    // If we're toggling a substep of Environment Variables
    if (setupSteps[index].isSubStep && index > envSetupIndex) {
      setCompletedSteps((prev) => {
        const newSteps = prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index].sort((a, b) => a - b);

        // Check if both substeps are completed
        const envSubSteps = setupSteps
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
        const envSubSteps = setupSteps
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

  return (
    <div className="py-6 md:py-12 bg-background">
      <div className="container px-4 md:px-6 max-w-5xl pb-20 md:pb-12">
        <SetupGuide
          steps={setupSteps}
          completedSteps={completedSteps}
          onToggleStep={toggleStep}
          copiedIndex={copiedIndex}
          onCopy={copyToClipboard}
          projectRef={projectRef}
          onProjectRefChange={setProjectRef}
        />
        <NextSteps steps={nextSteps} />
      </div>
    </div>
  );
}
