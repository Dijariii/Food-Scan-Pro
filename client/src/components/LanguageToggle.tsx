import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/language-provider";

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "sq" : "en")}
      className="font-medium"
    >
      {language === "en" ? "Shqip" : "English"}
    </Button>
  );
}
