/**
 * @module domain/product/types
 * @description Product domain type definitions
 */

export interface Product {
  id: string;
  name: string;
  mainImage: string;
  category: string;
  price?: number;
  createdAt: string;
}

export interface ProductListParams {
  idCategory?: number | null;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  products: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
