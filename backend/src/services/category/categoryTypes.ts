/**
 * @summary
 * Type definitions for category service operations.
 * Defines interfaces for category entities and service operations.
 *
 * @module services/category/categoryTypes
 */

/**
 * @interface CategoryEntity
 * @description Represents a category in the catalog
 *
 * @property {number} idCategory - Category identifier
 * @property {string} name - Category name
 * @property {string} description - Category description
 * @property {string | null} icon - Category icon URL (nullable)
 * @property {number} displayOrder - Display order
 * @property {number | null} idParent - Parent category identifier (nullable)
 * @property {string | null} parentName - Parent category name (nullable)
 */
export interface CategoryEntity {
  idCategory: number;
  name: string;
  description: string;
  icon: string | null;
  displayOrder: number;
  idParent: number | null;
  parentName: string | null;
}
