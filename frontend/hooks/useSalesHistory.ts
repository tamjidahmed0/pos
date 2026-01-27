import { useQuery } from '@tanstack/react-query'
import { fetchSalesHistory } from '../api/SalesHistory'

export const useSalesHistory = () => {
  return useQuery({
    queryKey: ['salesHistory'],
    queryFn: fetchSalesHistory,
    staleTime: 5 * 60 * 1000,
  })
}