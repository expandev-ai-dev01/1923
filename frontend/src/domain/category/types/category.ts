/**
 * @module domain/category/types
 * @description Category domain type definitions
 */

export interface Category {
  id: number;
  name: string;
  icon?: string;
  displayOrder: number;
  parentId?: number;
}
