import { cn } from "@/lib/utils";
import { SidebarSection } from "./types";
import { useEffect, useCallback, useRef } from "react";

interface SidebarProps {
  sidebarItems: SidebarSection;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({
  sidebarItems,
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const scrollToSection = useCallback(
    (href: string) => {
      const element = document.querySelector(href);
      if (element) {
        isScrollingRef.current = true;
        const newSection = href.replace("#", "");
        onSectionChange(newSection);

        element.scrollIntoView({ behavior: "smooth" });

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Reset the scrolling flag after animation
        timeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    },
    [onSectionChange]
  );

  const handleScroll = useCallback(() => {
    if (isScrollingRef.current) return;

    const sections = [
      "setup",
      "project-customization",
      "drizzle-orm",
      "authentication",
      "ui-components",
    ];

    let currentSection = sections[0];
    let minDistance = Infinity;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < minDistance) {
          minDistance = distance;
          currentSection = section;
        }
      }
    });

    if (currentSection !== activeSection) {
      onSectionChange(currentSection);
    }
  }, [activeSection, onSectionChange]);

  useEffect(() => {
    const debouncedScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <div className="flex-none">
      {/* Desktop Navigation */}
      <aside className="hidden lg:block fixed inset-y-0 z-30 w-64">
        <div className="h-full border-r bg-card/30 px-4 py-8 overflow-y-auto">
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

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-background p-2 z-10">
        <div className="flex justify-around overflow-x-auto">
          {Object.entries(sidebarItems).flatMap(([section, items]) =>
            items.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "px-3 py-2 text-sm rounded-md whitespace-nowrap",
                  activeSection === item.href.replace("#", "")
                    ? "bg-card font-medium text-primary"
                    : "text-card-foreground"
                )}
              >
                {item.title}
              </button>
            ))
          )}
        </div>
      </nav>
    </div>
  );
}
