import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useLocalStorage } from './use-local-storage';
import { type ScannedProduct } from '@shared/schema';
import { useToast } from './use-toast';

export function useScannedProducts() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [localProducts, setLocalProducts] = useLocalStorage<ScannedProduct[]>('scanned-products', []);

  // Query to fetch products from API
  const { data: apiProducts = [], ...queryRest } = useQuery({
    queryKey: ['/api/products'],
    onSuccess: (data) => {
      // Merge API products with local products
      const mergedProducts = [...localProducts, ...data].reduce((acc, product) => {
        // Use Map to keep only unique products by barcode
        acc.set(product.barcode, product);
        return acc;
      }, new Map<string, ScannedProduct>());

      setLocalProducts(Array.from(mergedProducts.values()));
    },
  });

  // Mutation to scan new products
  const scanMutation = useMutation({
    mutationFn: async (barcode: string) => {
      const response = await apiRequest('GET', `/api/products/${barcode}`);
      return response.json();
    },
    onSuccess: (data) => {
      // Add to local storage
      setLocalProducts((current) => {
        const exists = current.find(p => p.barcode === data.barcode);
        if (exists) return current;
        return [data, ...current];
      });

      // Invalidate query cache
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });

      toast({
        title: 'Product Scanned',
        description: `Successfully scanned ${data.productName || 'product'}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Mutation to toggle favorite status
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('POST', `/api/products/${id}/favorite`);
      return response.json();
    },
    onSuccess: (data) => {
      setLocalProducts((current) =>
        current.map((product) =>
          product.id === data.id ? data : product
        )
      );
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
  });

  // Mutation to toggle hidden status
  const toggleHiddenMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('POST', `/api/products/${id}/hide`);
      return response.json();
    },
    onSuccess: (data) => {
      setLocalProducts((current) =>
        current.map((product) =>
          product.id === data.id ? data : product
        )
      );
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
  });

  return {
    products: localProducts,
    scanProduct: scanMutation.mutate,
    toggleFavorite: toggleFavoriteMutation.mutate,
    toggleHidden: toggleHiddenMutation.mutate,
    isLoading: queryRest.isLoading || scanMutation.isPending,
    ...queryRest,
  };
}
