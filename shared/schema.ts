import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const scannedProducts = pgTable("scanned_products", {
  id: serial("id").primaryKey(),
  barcode: text("barcode").notNull(),
  productName: text("product_name"),
  brand: text("brand"),
  imageUrl: text("image_url"),
  ingredients: text("ingredients"),
  nutriments: text("nutriments"),
  scannedAt: timestamp("scanned_at").notNull().defaultNow(),
  isFavorite: boolean("is_favorite").notNull().default(false),
  isHidden: boolean("is_hidden").notNull().default(false),
});

export const insertScannedProductSchema = createInsertSchema(scannedProducts).omit({
  id: true,
  scannedAt: true,
  isFavorite: true,
  isHidden: true,
});

export type ScannedProduct = typeof scannedProducts.$inferSelect;
export type InsertScannedProduct = z.infer<typeof insertScannedProductSchema>;

export const barcodeSchema = z.object({
  barcode: z.string().min(8).max(13).regex(/^\d+$/, "Barcode must contain only numbers"),
});

// Calculate health score based on nutritional values
export function calculateHealthScore(nutriments: any): number {
  try {
    const parsedNutriments = typeof nutriments === 'string' ? JSON.parse(nutriments) : nutriments;

    // Define ideal ranges for nutrients (per 100g/ml)
    const idealRanges = {
      'energy-kcal': { min: 0, max: 400, weight: 1 },
      'fat': { min: 0, max: 17, weight: 1 },
      'saturated-fat': { min: 0, max: 5, weight: 1.5 },
      'carbohydrates': { min: 0, max: 50, weight: 0.8 },
      'sugars': { min: 0, max: 25, weight: 1.2 },
      'fiber': { min: 3, max: 30, weight: 1.5 },
      'proteins': { min: 5, max: 25, weight: 1 },
      'salt': { min: 0, max: 6, weight: 1.2 },
      'sodium': { min: 0, max: 2400, weight: 1 }
    };

    let totalScore = 0;
    let totalWeight = 0;

    // Calculate weighted score for each nutrient
    Object.entries(idealRanges).forEach(([key, range]) => {
      const value = parsedNutriments[key] || parsedNutriments[key.replace(/-/g, '_')];
      if (value !== undefined) {
        let score = 100;

        // Penalize values outside the ideal range
        if (value < range.min) {
          score = (value / range.min) * 100;
        } else if (value > range.max) {
          score = Math.max(0, 100 - ((value - range.max) / range.max) * 100);
        }

        totalScore += score * range.weight;
        totalWeight += range.weight;
      }
    });

    // Return normalized score
    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 50;
  } catch (error) {
    return 50; // Default score if calculation fails
  }
}