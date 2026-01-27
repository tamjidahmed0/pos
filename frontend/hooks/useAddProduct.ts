import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddProduct } from '../api/addProduct';
import type { ProductFormData } from '../src/types/index';

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: ProductFormData) => AddProduct(dto),
    onSuccess: (data) => {
      console.log('Product added:', data);
      queryClient.invalidateQueries({ queryKey: ['allProducts'] });
    },
    onError: (error) => {
      console.error('Failed to add product', error);
    },
  });
};
