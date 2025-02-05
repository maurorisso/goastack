import { cn } from "@/lib/utils";
import { SidebarSection } from "./types";

interface DocsNavigationProps {
  sidebarItems: SidebarSection;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DocsNavigation({
  sidebarItems,
  activeSection,
  onSectionChange,
}: DocsNavigationProps) {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onSectionChange(href.replace("#", ""));
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
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
    </>
  );
}
