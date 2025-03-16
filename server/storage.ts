import { scannedProducts, type ScannedProduct, type InsertScannedProduct } from "@shared/schema";

export interface IStorage {
  getScannedProducts(): Promise<ScannedProduct[]>;
  addScannedProduct(product: InsertScannedProduct): Promise<ScannedProduct>;
  toggleFavorite(id: number): Promise<ScannedProduct>;
  toggleHidden(id: number): Promise<ScannedProduct>;
}

export class MemStorage implements IStorage {
  private products: Map<number, ScannedProduct>;
  private currentId: number;

  constructor() {
    this.products = new Map();
    this.currentId = 1;
  }

  async getScannedProducts(): Promise<ScannedProduct[]> {
    return Array.from(this.products.values())
      .filter(product => !product.isHidden)
      .sort((a, b) => b.scannedAt.getTime() - a.scannedAt.getTime());
  }

  async addScannedProduct(product: InsertScannedProduct): Promise<ScannedProduct> {
    const id = this.currentId++;
    const scannedProduct: ScannedProduct = {
      ...product,
      id,
      scannedAt: new Date(),
      isFavorite: false,
      isHidden: false,
    };
    this.products.set(id, scannedProduct);
    return scannedProduct;
  }

  async toggleFavorite(id: number): Promise<ScannedProduct> {
    const product = this.products.get(id);
    if (!product) {
      throw new Error("Product not found");
    }
    const updatedProduct = { ...product, isFavorite: !product.isFavorite };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async toggleHidden(id: number): Promise<ScannedProduct> {
    const product = this.products.get(id);
    if (!product) {
      throw new Error("Product not found");
    }
    const updatedProduct = { ...product, isHidden: !product.isHidden };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
}

export const storage = new MemStorage();