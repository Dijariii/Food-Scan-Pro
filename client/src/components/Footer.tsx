import { Link } from "wouter";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FoodScan
            </p>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/scanner" className="text-sm text-muted-foreground hover:text-primary">
              Scanner
            </Link>
            <Link href="/history" className="text-sm text-muted-foreground hover:text-primary">
              History
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
