/**
 * @hook useProductList
 * @domain product
 * @description Hook for managing product list with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductListOptions } from './types';

export const useProductList = (options: UseProductListOptions = {}) => {
  const { filters, enabled = true } = options;
  const queryKey = ['products', filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productService.list(filters),
    enabled,
  });

  return {
    products: data?.products ?? [],
    totalCount: data?.totalCount ?? 0,
    page: data?.page ?? 1,
    pageSize: data?.pageSize ?? 24,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    error,
    refetch,
  };
};
