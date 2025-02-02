import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-center text-sm flex items-center gap-1 leading-loose text-muted-foreground md:text-left">
          Built with <Heart size={16} className="text-primary" /> by{" "}
          <Link
            href="https://x.com/y0mauro"
            target="_blank"
            className="text-primary hover:underline underline-offset-4"
          >
            @y0mauro
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yourusername/goa-stack"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:underline"
          >
            GitHub
          </a>
          <a
            href="/docs"
            className="text-sm text-muted-foreground hover:underline"
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
