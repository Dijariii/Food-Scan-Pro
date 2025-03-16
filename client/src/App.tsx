import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./lib/theme-provider";
import { LanguageProvider } from "./lib/language-provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Scanner from "./pages/scanner";
import History from "./pages/history";
import FoodSearch from "./pages/food-search";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/scanner" component={Scanner} />
      <Route path="/history" component={History} />
      <Route path="/food-search" component={FoodSearch} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="foodscan-theme">
      <LanguageProvider defaultLanguage="en">
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;