/**
 * @summary
 * Category API controller for category listing operations.
 * Handles category retrieval with hierarchy information.
 *
 * @module api/v1/internal/category/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/response';
import { categoryList } from '@/services/category';

/**
 * @api {get} /api/v1/internal/category List Categories
 * @apiName ListCategories
 * @apiGroup Category
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all active categories with hierarchy information
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data Array of categories
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @rule {be-category-listing}
     * Execute category listing
     */
    const result = await categoryList();

    res.json(successResponse(result));
  } catch (error: any) {
    next(error);
  }
}
