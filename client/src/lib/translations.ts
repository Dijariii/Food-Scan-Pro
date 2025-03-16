import { z } from "zod";

export const languages = ["en", "sq"] as const;
export type Language = (typeof languages)[number];

export const translationSchema = z.object({
  // Navigation
  home: z.string(),
  scanner: z.string(),
  history: z.string(),
  login: z.string(),
  signup: z.string(),
  logout: z.string(),

  // Auth
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  createAccount: z.string(),
  alreadyHaveAccount: z.string(),
  dontHaveAccount: z.string(),

  // Scanner
  scanProduct: z.string(),
  scanBarcode: z.string(),
  enterBarcode: z.string(),
  scan: z.string(),
  scanning: z.string(),
  productScanned: z.string(),
  scanningProduct: z.string(),

  // Product
  productDetails: z.string(),
  ingredients: z.string(),
  nutritionFacts: z.string(),
  healthScore: z.string(),
  barcode: z.string(),
  noIngredientsListed: z.string(),
  unknownProduct: z.string(),
  unknownBrand: z.string(),
  addedToFavorites: z.string(),
  removedFromFavorites: z.string(),
  hiddenFromHistory: z.string(),

  // Home
  welcome: z.string(),
  welcomeDescription: z.string(),
  startScanning: z.string(),
  viewHistory: z.string(),

  // History
  noProducts: z.string(),
  searchProducts: z.string(),
  noSearchResults: z.string(),
  loading: z.string(),

  // Food Search
  searchCommonFoods: z.string(),
  searchFoodPlaceholder: z.string(),
  search: z.string(),
  availableFoods: z.string(),

  // Nutrition Info
  healthInsights: z.string(),
  vitaminsAndMinerals: z.string(),
  ingredientAnalysis: z.string(),
});

export type Translations = z.infer<typeof translationSchema>;

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: "Home",
    scanner: "Scanner",
    history: "History",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",

    // Auth
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",

    // Scanner
    scanProduct: "Scan Product",
    scanBarcode: "Scan Barcode",
    enterBarcode: "Enter barcode number",
    scan: "Scan",
    scanning: "Scanning...",
    productScanned: "Product Scanned",
    scanningProduct: "Scanning product...",

    // Product
    productDetails: "Product Details",
    ingredients: "Ingredients",
    nutritionFacts: "Nutrition Facts",
    healthScore: "Health Score",
    barcode: "Barcode",
    noIngredientsListed: "No ingredients listed",
    unknownProduct: "Unknown Product",
    unknownBrand: "Unknown Brand",
    addedToFavorites: "Added to favorites",
    removedFromFavorites: "Removed from favorites",
    hiddenFromHistory: "Hidden from history",

    // Home
    welcome: "Welcome to FoodScan",
    welcomeDescription: "Scan food products to get detailed nutritional information",
    startScanning: "Start Scanning",
    viewHistory: "View Scan History",

    // History
    noProducts: "No products have been scanned yet",
    searchProducts: "Search products...",
    noSearchResults: "No products found matching your search",
    loading: "Loading...",

    // Food Search
    searchCommonFoods: "Search Common Foods",
    searchFoodPlaceholder: "Enter a food name (e.g., banana, egg)",
    search: "Search",
    availableFoods: "Available foods",

    // Nutrition Info
    healthInsights: "Health Insights",
    vitaminsAndMinerals: "Vitamins & Minerals",
    ingredientAnalysis: "Ingredient Analysis",
  },
  sq: {
    // Navigation
    home: "Ballina",
    scanner: "Skaneri",
    history: "Historiku",
    login: "Kyçu",
    signup: "Regjistrohu",
    logout: "Dilni",

    // Auth
    username: "Emri i përdoruesit",
    password: "Fjalëkalimi",
    confirmPassword: "Konfirmo fjalëkalimin",
    createAccount: "Krijo llogari",
    alreadyHaveAccount: "Tashmë keni një llogari?",
    dontHaveAccount: "Nuk keni llogari?",

    // Scanner
    scanProduct: "Skano Produktin",
    scanBarcode: "Skano Barkod",
    enterBarcode: "Shkruani numrin e barkodit",
    scan: "Skano",
    scanning: "Duke skanuar...",
    productScanned: "Produkti u skanua",
    scanningProduct: "Duke skanuar produktin...",

    // Product
    productDetails: "Detajet e Produktit",
    ingredients: "Përbërësit",
    nutritionFacts: "Vlerat Ushqyese",
    healthScore: "Vlerësimi Shëndetësor",
    barcode: "Barkodi",
    noIngredientsListed: "Nuk ka përbërës të listuar",
    unknownProduct: "Produkt i Panjohur",
    unknownBrand: "Markë e Panjohur",
    addedToFavorites: "Shtuar te të preferuarat",
    removedFromFavorites: "Hequr nga të preferuarat",
    hiddenFromHistory: "Fshehur nga historiku",

    // Home
    welcome: "Mirë se vini në FoodScan",
    welcomeDescription: "Skanoni produktet ushqimore për të marrë informacion të detajuar ushqyes",
    startScanning: "Fillo Skanimin",
    viewHistory: "Shiko Historikun",

    // History
    noProducts: "Nuk ka produkte të skanuara ende",
    searchProducts: "Kërko produktet...",
    noSearchResults: "Nuk u gjetën produkte që përputhen me kërkimin tuaj",
    loading: "Duke ngarkuar...",

    // Food Search
    searchCommonFoods: "Kërko Ushqime të Zakonshme",
    searchFoodPlaceholder: "Shkruani emrin e ushqimit (p.sh., banane, vezë)",
    search: "Kërko",
    availableFoods: "Ushqimet në dispozicion",

    // Nutrition Info
    healthInsights: "Informacione Shëndetësore",
    vitaminsAndMinerals: "Vitamina & Minerale",
    ingredientAnalysis: "Analiza e Përbërësve",
  },
};