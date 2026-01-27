import { useQuery } from '@tanstack/react-query'
import { fetchAllProducts } from '../api/AllProducts'

export const useAllProducts = () => {
  return useQuery({
    queryKey: ['allProducts'],
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000,
  })
}