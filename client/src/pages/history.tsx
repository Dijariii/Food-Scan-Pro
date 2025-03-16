import { useScannedProducts } from "@/hooks/use-scanned-products";
import ProductCard from "@/components/ProductCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useTranslation } from "@/lib/language-provider";
import { useState } from "react";

export default function History() {
  const { products, isLoading } = useScannedProducts();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

  const filteredProducts = products?.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.productName?.toLowerCase().includes(searchLower) ||
      product.brand?.toLowerCase().includes(searchLower) ||
      product.ingredients?.toLowerCase().includes(searchLower) ||
      product.barcode.includes(searchQuery)
    );
  });

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("searchProducts")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {!filteredProducts?.length ? (
        <Card className="p-8 text-center text-muted-foreground">
          {searchQuery ? t("noSearchResults") : t("noProducts")}
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}