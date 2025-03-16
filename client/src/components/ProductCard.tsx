import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { calculateHealthScore, type ScannedProduct } from "@shared/schema";
import { format } from "date-fns";
import { Heart, EyeOff, AlertTriangle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/language-provider";
import NutritionInfo from "./NutritionInfo";

interface ProductCardProps {
  product: ScannedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const nutriments = JSON.parse(product.nutriments || "{}");
  const healthScore = calculateHealthScore(nutriments);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t, language } = useTranslation();

  // Common nutrition facts to display
  const nutritionFacts = [
    { label: "Energy", key: "energy-kcal", unit: "kcal" },
    { label: "Fat", key: "fat", unit: "g" },
    { label: "Saturated Fat", key: "saturated-fat", unit: "g" },
    { label: "Carbohydrates", key: "carbohydrates", unit: "g" },
    { label: "Sugars", key: "sugars", unit: "g" },
    { label: "Fiber", key: "fiber", unit: "g" },
    { label: "Proteins", key: "proteins", unit: "g" },
    { label: "Salt", key: "salt", unit: "g" },
    { label: "Sodium", key: "sodium", unit: "mg" },
  ];

  const toggleFavorite = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/products/${product.id}/favorite`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: product.isFavorite ? t("removedFromFavorites") : t("addedToFavorites"),
        description: `${product.productName} has been ${product.isFavorite ? t("removedFromFavorites") : t("addedToFavorites")}`,
      });
    },
  });

  const toggleHidden = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/products/${product.id}/hide`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: t("hiddenFromHistory"),
        description: `${product.productName} ${t("hiddenFromHistory")}`,
      });
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold line-clamp-2">
                {product.productName || t("unknownProduct")}
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite.mutate()}
                  className="h-8 w-8"
                  disabled={toggleFavorite.isPending}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      product.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleHidden.mutate()}
                  className="h-8 w-8"
                  disabled={toggleHidden.isPending}
                >
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{product.brand || t("unknownBrand")}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{t("healthScore")}:</span>
                <span
                  className={`text-lg font-bold ${
                    healthScore >= 70
                      ? "text-green-600"
                      : healthScore >= 40
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {healthScore}
                </span>
              </div>
              {product.scannedAt && (
                <time className="text-sm text-muted-foreground whitespace-nowrap">
                  {format(new Date(product.scannedAt), "MMM d, yyyy")}
                </time>
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {product.imageUrl && (
          <div className="relative w-full aspect-square sm:aspect-video max-h-48">
            <img
              src={product.imageUrl}
              alt={product.productName || t("unknownProduct")}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        )}

        <NutritionInfo
            nutriments={nutriments}
            ingredients={product.ingredients}
          />

        <Separator />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{t("barcode")}:</span>
          <span className="font-mono">{product.barcode}</span>
        </div>
      </CardContent>
    </Card>
  );
}