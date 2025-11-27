/**
 * @summary
 * Type definitions for product service operations.
 * Defines interfaces for product entities and service operations.
 *
 * @module services/product/productTypes
 */

/**
 * @interface ProductEntity
 * @description Represents a product in the catalog
 *
 * @property {number} idProduct - Product identifier
 * @property {string} name - Product name
 * @property {string} mainImage - Main product image URL
 * @property {number} idCategory - Category identifier
 * @property {string} categoryName - Category name
 * @property {number | null} price - Product price (nullable)
 * @property {Date} dateCreated - Product creation date
 */
export interface ProductEntity {
  idProduct: number;
  name: string;
  mainImage: string;
  idCategory: number;
  categoryName: string;
  price: number | null;
  dateCreated: Date;
}

/**
 * @interface ProductListRequest
 * @description Request parameters for product listing
 *
 * @property {number | null} idCategory - Category filter (null for all)
 * @property {string} sortBy - Sort criteria
 * @property {number} page - Page number (1-based)
 * @property {number} pageSize - Products per page
 */
export interface ProductListRequest {
  idCategory: number | null;
  sortBy: string;
  page: number;
  pageSize: number;
}

/**
 * @interface ProductListResponse
 * @description Response structure for product listing
 *
 * @property {ProductEntity[]} products - Array of products
 * @property {number} totalCount - Total products matching filter
 * @property {number} page - Current page number
 * @property {number} pageSize - Products per page
 * @property {number} totalPages - Total pages available
 */
export interface ProductListResponse {
  products: ProductEntity[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * @type SortCriteria
 * @description Valid sort criteria for product listing
 */
export type SortCriteria =
  | 'name_asc'
  | 'name_desc'
  | 'price_asc'
  | 'price_desc'
  | 'date_asc'
  | 'date_desc';
