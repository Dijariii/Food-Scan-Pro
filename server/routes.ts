import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScannedProductSchema, barcodeSchema, calculateHealthScore } from "@shared/schema";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getScannedProducts();
    res.json(products);
  });

  app.get("/api/products/:barcode", async (req, res) => {
    const result = barcodeSchema.safeParse({ barcode: req.params.barcode });
    if (!result.success) {
      return res.status(400).json({ message: "Invalid barcode format" });
    }

    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${result.data.barcode}.json`
      );

      if (response.data.status === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      const { product } = response.data;
      const productData = {
        barcode: result.data.barcode,
        productName: product.product_name,
        brand: product.brands,
        imageUrl: product.image_url,
        ingredients: product.ingredients_text,
        nutriments: JSON.stringify(product.nutriments),
      };

      const validatedProduct = insertScannedProductSchema.parse(productData);
      const savedProduct = await storage.addScannedProduct(validatedProduct);
      res.json(savedProduct);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product information" });
    }
  });

  app.post("/api/products/:id/favorite", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await storage.toggleFavorite(id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: "Product not found" });
    }
  });

  app.post("/api/products/:id/hide", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await storage.toggleHidden(id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: "Product not found" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}