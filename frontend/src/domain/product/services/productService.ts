/**
 * @service productService
 * @domain product
 * @type authenticated
 * @description Service for product catalog operations
 */

import { authenticatedClient } from '@/core/lib/api';
import type { ProductListParams, ProductListResponse } from '../types';

export const productService = {
  /**
   * List products with filtering, sorting, and pagination
   */
  async list(params?: ProductListParams): Promise<ProductListResponse> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: ProductListResponse }>(
      '/product',
      { params }
    );
    return data.data;
  },
};
