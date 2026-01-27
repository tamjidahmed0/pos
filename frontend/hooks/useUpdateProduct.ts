import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../api/updateProduct';
import type { Product } from '../src/types';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateProduct(id, data),

    onSuccess: (updatedProduct: Product) => {
      queryClient.setQueryData<Product[]>(
        ['allProducts'],
        (old = []) =>
          old.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
          )
      );
    },
  });
};
