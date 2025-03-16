import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Barcode, History } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-6 space-y-6">
          <div className="text-center space-y-2">
            <Barcode className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold">Welcome to FoodScan</h1>
            <p className="text-muted-foreground">
              Scan food products to get detailed nutritional information
            </p>
          </div>

          <div className="grid gap-4">
            <Link href="/scanner">
              <Button className="w-full" size="lg">
                <Barcode className="mr-2 h-5 w-5" />
                Start Scanning
              </Button>
            </Link>
            
            <Link href="/history">
              <Button variant="outline" className="w-full" size="lg">
                <History className="mr-2 h-5 w-5" />
                View Scan History
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
