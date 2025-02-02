import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { EnvCheck } from "@/components/env-check";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Goa Stack",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <Header />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EnvCheck>
            <main className="flex-grow ">{children}</main>
            <Toaster />
          </EnvCheck>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
