import { useQuery } from '@tanstack/react-query';
import { getStats } from '../api/getStats';

export interface Stats {
  totalSalseAmount: number;
  totalProducts: number;
  totalStock: number;
  totalTransactions: number;
}

export const useStats = () => {
  return useQuery<Stats>({
    queryKey: ['stats'],
    queryFn: getStats,
  });
};
