import { Step } from "./types";
import { SetupStep } from "./setup-step";

interface SetupGuideProps {
  steps: Step[];
  completedSteps: number[];
  onToggleStep: (index: number) => void;
  copiedIndex: string | number | null;
  onCopy: (text: string, index: string | number) => void;
  projectRef: string;
  onProjectRefChange: (value: string) => void;
}

export function SetupGuide({
  steps,
  completedSteps,
  onToggleStep,
  copiedIndex,
  onCopy,
  projectRef,
  onProjectRefChange,
}: SetupGuideProps) {
  return (
    <div id="setup" className="scroll-mt-12">
      <h1 className="text-3xl font-bold mb-8">Project Setup</h1>
      <div className="space-y-8">
        <section>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <SetupStep
                key={index}
                step={step}
                index={index}
                isCompleted={completedSteps.includes(index)}
                onToggle={() => onToggleStep(index)}
                copiedIndex={copiedIndex}
                onCopy={onCopy}
                projectRef={projectRef}
                onProjectRefChange={onProjectRefChange}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
