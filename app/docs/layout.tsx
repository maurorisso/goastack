"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const sidebarItems = {
  "Getting Started": [
    {
      title: "Project Setup",
      href: "#setup",
    },
  ],
  "Next Steps": [
    {
      title: "Project Customization",
      href: "#project-customization",
    },
    {
      title: "Drizzle ORM",
      href: "#drizzle-orm",
    },
    {
      title: "Authentication",
      href: "#authentication",
    },
    {
      title: "UI Components",
      href: "#ui-components",
    },
  ],
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("setup");
  const [setupCompleted, setSetupCompleted] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("setupCompleted");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "setup",
        "project-customization",
        "drizzle-orm",
        "authentication",
        "ui-components",
      ];

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleSetupStatus = (event: CustomEvent<boolean>) => {
      setSetupCompleted(event.detail);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener(
      "setupStatusChanged",
      handleSetupStatus as EventListener
    );
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(
        "setupStatusChanged",
        handleSetupStatus as EventListener
      );
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 fixed inset-y-0 hidden md:block">
        <div className="h-full border-r bg-card/30 px-4 py-8">
          <nav className="space-y-6 mt-12">
            {Object.entries(sidebarItems).map(([section, items]) => (
              <div key={section}>
                <h4 className="font-semibold mb-3 text-sm text-card-foreground px-2">
                  {section}
                </h4>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.href}>
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={cn(
                          "block w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-card transition-colors",
                          section === "Next Steps" && "pl-4",
                          activeSection === item.href.replace("#", "")
                            ? "bg-card font-medium text-primary"
                            : "text-card-foreground"
                        )}
                      >
                        {section === "Next Steps" && (
                          <span
                            className={cn(
                              "inline-block w-1 h-1 rounded-full mr-2",
                              activeSection === item.href.replace("#", "")
                                ? "bg-primary"
                                : "bg-muted-foreground/40"
                            )}
                          />
                        )}
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background p-2 z-10">
        <nav className="flex justify-around">
          {Object.entries(sidebarItems).flatMap(([section, items]) =>
            items.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "px-3 py-2 text-sm rounded-md",
                  activeSection === item.href.replace("#", "")
                    ? "bg-card font-medium text-primary"
                    : "text-card-foreground"
                )}
              >
                {item.title}
              </button>
            ))
          )}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 ml-64 md:ml-0">{children}</main>
    </div>
  );
}
