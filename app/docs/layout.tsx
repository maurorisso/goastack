"use client";

import { useState } from "react";
import { Sidebar } from "@/components/docs/sidebar";
import { sidebarItems } from "./constants";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("setup");

  return (
    <div className="flex min-h-screen">
      <Sidebar
        sidebarItems={sidebarItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 lg:pl-64">{children}</main>
    </div>
  );
}
