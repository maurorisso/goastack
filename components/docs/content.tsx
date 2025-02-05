import React from "react";

export const HighlightedPath = ({ children }: { children: string }) => (
  <span className="font-bold bg-card rounded-md">{children}</span>
);

export const CommandText = ({ children }: { children: string }) => (
  <span className="font-bold bg-muted/50 px-1.5 py-0.5 rounded-md">
    {children}
  </span>
);
