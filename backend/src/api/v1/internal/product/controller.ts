/**
 * @summary
 * Product API controller for catalog listing operations.
 * Handles product retrieval with filtering, sorting, and pagination.
 *
 * @module api/v1/internal/product/controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { productList } from '@/services/product';

/**
 * @api {get} /api/v1/internal/product List Products
 * @apiName ListProducts
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists products with filtering, sorting, and pagination support
 *
 * @apiParam {Number} [idCategory] Category filter (optional)
 * @apiParam {String} [sortBy=date_desc] Sort criteria (name_asc, name_desc, price_asc, price_desc, date_asc, date_desc)
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=24] Products per page (12, 24, or 48)
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Array} data.products Array of products
 * @apiSuccess {Number} data.totalCount Total products matching filter
 * @apiSuccess {Number} data.page Current page number
 * @apiSuccess {Number} data.pageSize Products per page
 * @apiSuccess {Number} data.totalPages Total pages available
 *
 * @apiError {String} pageNumberInvalid Invalid page number
 * @apiError {String} pageSizeInvalid Invalid page size
 * @apiError {String} sortCriteriaInvalid Invalid sort criteria
 * @apiError {String} categoryDoesntExist Category not found
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const querySchema = z.object({
    idCategory: z.coerce.number().int().positive().optional(),
    sortBy: z.string().optional().default('date_desc'),
    page: z.coerce.number().int().positive().optional().default(1),
    pageSize: z.coerce.number().int().optional().default(24),
  });

  try {
    /**
     * @validation Validate query parameters
     */
    const validated = querySchema.parse(req.query);

    /**
     * @rule {be-product-listing}
     * Execute product listing with parameters
     */
    const result = await productList({
      idCategory: validated.idCategory ?? null,
      sortBy: validated.sortBy,
      page: validated.page,
      pageSize: validated.pageSize,
    });

    res.json(successResponse(result));
  } catch (error: any) {
    if (error.message === 'pageNumberInvalid') {
      res.status(400).json(errorResponse(error.message, 'VALIDATION_ERROR'));
    } else if (error.message === 'pageSizeInvalid') {
      res.status(400).json(errorResponse(error.message, 'VALIDATION_ERROR'));
    } else if (error.message === 'sortCriteriaInvalid') {
      res.status(400).json(errorResponse(error.message, 'VALIDATION_ERROR'));
    } else if (error.message === 'categoryDoesntExist') {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    } else {
      next(error);
    }
  }
}
