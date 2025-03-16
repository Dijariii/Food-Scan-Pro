import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useTranslation } from "@/lib/language-provider";

interface NutritionInfoProps {
  nutriments: Record<string, any>;
  ingredients?: string;
}

export default function NutritionInfo({ nutriments, ingredients }: NutritionInfoProps) {
  const { t } = useTranslation();

  // Common vitamins and minerals to look for
  const micronutrients = {
    "vitamin-a": { name: "Vitamin A", benefits: "Essential for vision, immune system, and cell growth" },
    "vitamin-c": { name: "Vitamin C", benefits: "Supports immune system, antioxidant properties" },
    "vitamin-d": { name: "Vitamin D", benefits: "Important for bone health and immune function" },
    "calcium": { name: "Calcium", benefits: "Essential for bone health and muscle function" },
    "iron": { name: "Iron", benefits: "Required for healthy blood and oxygen transport" },
    "potassium": { name: "Potassium", benefits: "Supports heart health and blood pressure regulation" },
  };

  // Nutrition insights based on values
  const getHealthInsights = () => {
    const insights = [];
    
    // Check protein content
    const protein = nutriments.proteins || nutriments.protein;
    if (protein > 20) {
      insights.push("High in protein - good for muscle building and repair");
    }

    // Check fiber content
    const fiber = nutriments.fiber;
    if (fiber > 5) {
      insights.push("Good source of fiber - aids digestion and helps maintain healthy blood sugar levels");
    }

    // Check sugar content
    const sugars = nutriments.sugars;
    if (sugars > 22.5) {
      insights.push("High in sugar - consume in moderation");
    }

    // Check saturated fat
    const saturatedFat = nutriments["saturated-fat"] || nutriments.saturated_fat;
    if (saturatedFat > 5) {
      insights.push("High in saturated fat - limit consumption for heart health");
    }

    return insights;
  };

  const insights = getHealthInsights();

  return (
    <div className="space-y-6">
      {/* Health Insights */}
      {insights.length > 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Info className="h-5 w-5" />
              {t("healthInsights")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Vitamins and Minerals */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardHeader>
          <CardTitle className="text-primary">{t("vitaminsAndMinerals")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(micronutrients).map(([key, info]) => {
              const value = nutriments[key] || nutriments[key.replace(/-/g, "_")];
              if (!value) return null;

              return (
                <Alert key={key} className="bg-white/50 dark:bg-white/5">
                  <h4 className="font-semibold">{info.name}</h4>
                  <AlertDescription className="mt-2 text-sm">
                    {info.benefits}
                    <div className="mt-1 text-xs text-muted-foreground">
                      {value}%
                    </div>
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Ingredient Analysis */}
      {ingredients && (
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardHeader>
            <CardTitle className="text-primary">{t("ingredientAnalysis")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {ingredients}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
