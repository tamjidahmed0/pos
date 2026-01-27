import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeSale } from '../api/completeSale';
import type { Sale } from '../src/types';
import { message } from 'antd';

export const useCompleteSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sale: Sale) => completeSale(sale),
    onMutate: () => {
      message.loading({ content: 'Processing sale...', key: 'sale' });
    },
    onSuccess: () => {
      message.success({ content: 'Sale completed successfully!', key: 'sale' });

      // invalidate sales history query to refetch
      queryClient.invalidateQueries({ queryKey: ['salesHistory'] });
    },
    onError: (error: any) => {
      message.error({ content: error.message || 'Failed to complete sale', key: 'sale' });
    },
  });
};
