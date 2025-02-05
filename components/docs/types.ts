import { ReactNode } from "react";

export type SubStep = {
  text?: string;
  url?: string;
  value?: string;
  input?: boolean;
};

export type Step = {
  command?: string;
  description: string;
  type: "command" | "info";
  subSteps?: SubStep[];
  isSubStep?: boolean;
};

export type NextStepItem = string | ReactNode[];

export type NextStepSection = {
  title: string;
  items: NextStepItem[];
};

export type NextStep = {
  title: string;
  description?: string;
  steps: {
    title: string;
    items: NextStepItem[];
  }[];
};

export type SidebarItem = {
  title: string;
  href: string;
};

export type SidebarSection = {
  [key: string]: SidebarItem[];
};
