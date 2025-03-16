import { useState } from "react";
import { useLocation } from "wouter";
import { useScannedProducts } from "@/hooks/use-scanned-products";
import { barcodeSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarcodeScanner from "@/components/BarcodeScanner";
import { Loader2, ScanLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/language-provider";

export default function Scanner() {
  const [manualBarcode, setManualBarcode] = useState("");
  const [, setLocation] = useLocation();
  const { scanProduct, isLoading } = useScannedProducts();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = barcodeSchema.safeParse({ barcode: manualBarcode });
    if (!result.success) {
      toast({
        title: "Invalid Barcode",
        description: "Please enter a valid barcode number",
        variant: "destructive",
      });
      return;
    }
    scanProduct(manualBarcode, {
      onSuccess: () => setLocation("/history"),
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5" />
            {t("scanProduct")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t("enterBarcode")}
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("scan")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <BarcodeScanner 
        onDetected={(barcode) => {
          if (!isLoading) {
            scanProduct(barcode, {
              onSuccess: () => setLocation("/history"),
            });
          }
        }} 
      />

      {isLoading && (
        <Card className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-muted-foreground">{t("scanningProduct")}</p>
        </Card>
      )}
    </div>
  );
}