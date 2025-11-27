/**
 * @service categoryService
 * @domain category
 * @type authenticated
 * @description Service for category operations
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Category } from '../types';

export const categoryService = {
  /**
   * List all active categories with hierarchy
   */
  async list(): Promise<Category[]> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Category[] }>(
      '/category'
    );
    return data.data;
  },
};
