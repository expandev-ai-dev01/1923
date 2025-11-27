/**
 * @store productStore
 * @domain product
 * @description Store for product catalog UI state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductStore {
  viewMode: 'grid' | 'list';
  sortBy: string;
  pageSize: number;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sortBy: string) => void;
  setPageSize: (size: number) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      viewMode: 'grid',
      sortBy: 'date_desc',
      pageSize: 24,
      setViewMode: (mode) => set({ viewMode: mode }),
      setSortBy: (sortBy) => set({ sortBy }),
      setPageSize: (size) => set({ pageSize: size }),
    }),
    { name: 'product-store' }
  )
);
