import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product } from '../src/types';
import { deleteProduct } from '../api/deleteProduct';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Product[]>(['allProducts'], (old = []) =>
        old.filter(p => p.id !== id)
      );
    },
    onError: (error: any) => {
      console.error('Failed to delete product', error);
    },
  });
};
