/**
 * @summary
 * Product business logic operations.
 * Handles product listing with filtering, sorting, and pagination.
 *
 * @module services/product/productLogic
 */

import { ProductListRequest, ProductListResponse, ProductEntity } from './productTypes';

/**
 * In-memory product storage
 */
const products: ProductEntity[] = [];

/**
 * In-memory category storage for validation
 */
const categories = new Map<number, { name: string; deleted: boolean }>();

/**
 * @summary
 * Initialize default categories
 */
function initializeCategories(): void {
  if (categories.size === 0) {
    categories.set(1, { name: 'Sala de Estar', deleted: false });
    categories.set(2, { name: 'Quarto', deleted: false });
    categories.set(3, { name: 'Cozinha', deleted: false });
    categories.set(4, { name: 'Escritório', deleted: false });
    categories.set(5, { name: 'Banheiro', deleted: false });
    categories.set(6, { name: 'Área Externa', deleted: false });
  }
}

/**
 * @summary
 * Lists products with filtering, sorting, and pagination
 *
 * @function productList
 * @module services/product/productLogic
 *
 * @param {ProductListRequest} params - List parameters
 *
 * @returns {Promise<ProductListResponse>} Paginated product list
 *
 * @throws {Error} When validation fails
 */
export async function productList(params: ProductListRequest): Promise<ProductListResponse> {
  initializeCategories();

  /**
   * @validation Validate page parameters
   */
  if (params.page < 1) {
    throw new Error('pageNumberInvalid');
  }

  /**
   * @validation Validate page size
   */
  if (![12, 24, 48].includes(params.pageSize)) {
    throw new Error('pageSizeInvalid');
  }

  /**
   * @validation Validate sort criteria
   */
  const validSortCriteria = [
    'name_asc',
    'name_desc',
    'price_asc',
    'price_desc',
    'date_asc',
    'date_desc',
  ];
  if (!validSortCriteria.includes(params.sortBy)) {
    throw new Error('sortCriteriaInvalid');
  }

  /**
   * @validation Validate category exists if provided
   */
  if (params.idCategory !== null) {
    const category = categories.get(params.idCategory);
    if (!category || category.deleted) {
      throw new Error('categoryDoesntExist');
    }
  }

  /**
   * @rule {fn-product-filtering}
   * Filter products by category if specified
   */
  let filteredProducts = products.filter((product) => {
    if (params.idCategory !== null) {
      return product.idCategory === params.idCategory;
    }
    return true;
  });

  /**
   * @rule {fn-product-sorting}
   * Sort products based on criteria
   */
  filteredProducts.sort((a, b) => {
    switch (params.sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'price_asc':
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      case 'price_desc':
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      case 'date_asc':
        return a.dateCreated.getTime() - b.dateCreated.getTime();
      case 'date_desc':
        return b.dateCreated.getTime() - a.dateCreated.getTime();
      default:
        return 0;
    }
  });

  const totalCount = filteredProducts.length;
  const totalPages = Math.ceil(totalCount / params.pageSize);

  /**
   * @rule {fn-product-pagination}
   * Apply pagination
   */
  const offset = (params.page - 1) * params.pageSize;
  const paginatedProducts = filteredProducts.slice(offset, offset + params.pageSize);

  return {
    products: paginatedProducts,
    totalCount,
    page: params.page,
    pageSize: params.pageSize,
    totalPages,
  };
}
