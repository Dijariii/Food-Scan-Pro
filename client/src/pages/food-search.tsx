import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/language-provider";
import NutritionInfo from "@/components/NutritionInfo";

// Common food database
const commonFoods = {
  "banana": {
    name: "Banana",
    nutriments: {
      "energy-kcal": 89,
      proteins: 1.1,
      carbohydrates: 22.8,
      sugars: 12.2,
      fiber: 2.6,
      potassium: 358,
      "vitamin-c": 8.7,
      "vitamin-b6": 0.4,
      magnesium: 27,
    },
    ingredients: "Rich in potassium and vitamin B6. Natural source of energy. Contains compounds that may moderate blood sugar levels. Good source of dietary fiber for digestive health.",
  },
  "egg": {
    name: "Egg (Large)",
    nutriments: {
      "energy-kcal": 72,
      proteins: 6.3,
      fats: 4.8,
      "saturated-fat": 1.6,
      iron: 0.9,
      "vitamin-d": 1.1,
      "vitamin-a": 6,
      "vitamin-b12": 0.6,
      selenium: 15.4,
      choline: 147,
    },
    ingredients: "Excellent source of protein and choline. Contains all essential amino acids. Rich in vitamin D, B12, and selenium. Important for brain development and immune function.",
  },
  "apple": {
    name: "Apple",
    nutriments: {
      "energy-kcal": 52,
      carbohydrates: 14,
      fiber: 2.4,
      sugars: 10.4,
      "vitamin-c": 4.6,
      potassium: 107,
      antioxidants: 1,
      pectin: 1.5,
    },
    ingredients: "Rich in dietary fiber and antioxidants. Contains pectin for heart health. Good source of vitamin C. May help regulate blood sugar levels.",
  },
  "spinach": {
    name: "Spinach (Raw)",
    nutriments: {
      "energy-kcal": 23,
      proteins: 2.9,
      carbohydrates: 3.6,
      fiber: 2.2,
      "vitamin-k": 483,
      "vitamin-a": 469,
      "vitamin-c": 28,
      iron: 2.7,
      calcium: 99,
      magnesium: 79,
    },
    ingredients: "Extremely rich in vitamin K and A. Good source of iron and calcium. High in antioxidants and nitrates. May support eye health and blood pressure regulation.",
  },
  "salmon": {
    name: "Salmon (Atlantic, cooked)",
    nutriments: {
      "energy-kcal": 208,
      proteins: 22,
      fats: 13,
      "omega-3": 2.3,
      "vitamin-d": 14.5,
      "vitamin-b12": 2.6,
      selenium: 36,
      potassium: 363,
    },
    ingredients: "Excellent source of omega-3 fatty acids. High in quality protein. Rich in vitamin D and B12. Contains selenium for thyroid function. May reduce inflammation and support heart health.",
  },
  "greek-yogurt": {
    name: "Greek Yogurt (Plain)",
    nutriments: {
      "energy-kcal": 59,
      proteins: 10,
      carbohydrates: 3.6,
      fats: 0.4,
      calcium: 111,
      probiotics: 1,
      "vitamin-b12": 0.5,
      potassium: 141,
    },
    ingredients: "High in protein and probiotics. Good source of calcium. Contains live beneficial bacteria. Supports gut health and immune function. Good for bone health.",
  },
  "quinoa": {
    name: "Quinoa (Cooked)",
    nutriments: {
      "energy-kcal": 120,
      proteins: 4.4,
      carbohydrates: 21.3,
      fiber: 2.8,
      iron: 1.5,
      magnesium: 64,
      zinc: 1.3,
      "vitamin-e": 0.6,
      "complete-protein": 1,
    },
    ingredients: "Complete protein containing all essential amino acids. Rich in fiber and minerals. Contains antioxidants and flavonoids. Gluten-free grain alternative. Good for heart health.",
  },
  "avocado": {
    name: "Avocado",
    nutriments: {
      "energy-kcal": 160,
      fats: 14.7,
      fiber: 6.7,
      potassium: 485,
      "vitamin-k": 21,
      "vitamin-c": 10,
      "vitamin-b6": 0.3,
      "healthy-fats": 1,
    },
    ingredients: "Rich in healthy monounsaturated fats. High in fiber and potassium. Contains various vitamins and minerals. Good for heart health and nutrient absorption.",
  }
};

export default function FoodSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<typeof commonFoods[keyof typeof commonFoods] | null>(null);
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const food = commonFoods[query as keyof typeof commonFoods];
    if (food) {
      setSelectedFood(food);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle>{t("searchCommonFoods")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder={t("searchFoodPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              {t("search")}
            </Button>
          </form>

          <div className="mt-4 text-sm text-muted-foreground">
            {t("availableFoods")}: {Object.keys(commonFoods).join(", ")}
          </div>
        </CardContent>
      </Card>

      {selectedFood && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/5">
            <CardHeader>
              <CardTitle>{selectedFood.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <NutritionInfo
                nutriments={selectedFood.nutriments}
                ingredients={selectedFood.ingredients}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}