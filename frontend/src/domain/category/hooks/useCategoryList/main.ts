/**
 * @hook useCategoryList
 * @domain category
 * @description Hook for managing category list with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';

export const useCategoryList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.list(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    categories: data ?? [],
    isLoading,
    error,
  };
};
