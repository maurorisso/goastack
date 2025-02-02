import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icon, Menu } from "lucide-react";
import { waveCircle } from "@lucide/lab";

export type NavigationItem = {
  title: string;
  href: string;
  isExternal?: boolean;
};

export type NavigationItems = NavigationItem[];

const navigationItems: NavigationItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="font-semibold flex items-center gap-2">
              <Icon iconNode={waveCircle} className="h-6 w-6 text-primary" />
              <div className="text-xl">GoaStack</div>
            </div>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="-ml-2 h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <nav className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Auth Section */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm hidden md:inline-block">
                  {user.email}
                </span>
                <form action={signOutAction}>
                  <Button type="submit" variant="outline" size="sm">
                    Sign out
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/sign-in">Sign In</Link>
                </Button>

                <Button asChild size="sm">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
