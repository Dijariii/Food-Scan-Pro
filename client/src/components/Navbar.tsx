import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Barcode, History, Home, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "@/lib/language-provider";

export default function Navbar() {
  const [location] = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t("home"), href: "/", icon: Home },
    { name: t("scanner"), href: "/scanner", icon: Barcode },
    { name: t("history"), href: "/history", icon: History },
    { name: t("searchCommonFoods"), href: "/food-search", icon: Search },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Barcode className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FoodScan</span>
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors",
                      location === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}