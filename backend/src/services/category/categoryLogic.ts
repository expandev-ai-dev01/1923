/**
 * @summary
 * Category business logic operations.
 * Handles category listing with hierarchy information.
 *
 * @module services/category/categoryLogic
 */

import { CategoryEntity } from './categoryTypes';

/**
 * In-memory category storage
 */
const categories: CategoryEntity[] = [
  {
    idCategory: 1,
    name: 'Sala de Estar',
    description: 'Móveis para sala de estar',
    icon: null,
    displayOrder: 1,
    idParent: null,
    parentName: null,
  },
  {
    idCategory: 2,
    name: 'Quarto',
    description: 'Móveis para quarto',
    icon: null,
    displayOrder: 2,
    idParent: null,
    parentName: null,
  },
  {
    idCategory: 3,
    name: 'Cozinha',
    description: 'Móveis para cozinha',
    icon: null,
    displayOrder: 3,
    idParent: null,
    parentName: null,
  },
  {
    idCategory: 4,
    name: 'Escritório',
    description: 'Móveis para escritório',
    icon: null,
    displayOrder: 4,
    idParent: null,
    parentName: null,
  },
  {
    idCategory: 5,
    name: 'Banheiro',
    description: 'Móveis para banheiro',
    icon: null,
    displayOrder: 5,
    idParent: null,
    parentName: null,
  },
  {
    idCategory: 6,
    name: 'Área Externa',
    description: 'Móveis para área externa',
    icon: null,
    displayOrder: 6,
    idParent: null,
    parentName: null,
  },
];

/**
 * @summary
 * Lists all active categories with hierarchy information
 *
 * @function categoryList
 * @module services/category/categoryLogic
 *
 * @returns {Promise<CategoryEntity[]>} Array of categories
 */
export async function categoryList(): Promise<CategoryEntity[]> {
  /**
   * @rule {fn-category-sorting}
   * Sort categories by display order and name
   */
  return categories.sort((a, b) => {
    if (a.displayOrder !== b.displayOrder) {
      return a.displayOrder - b.displayOrder;
    }
    return a.name.localeCompare(b.name);
  });
}
