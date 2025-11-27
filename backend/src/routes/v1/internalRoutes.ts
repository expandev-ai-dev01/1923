/**
 * @summary
 * Internal API routes configuration for authenticated endpoints.
 * Handles all authenticated user operations and protected resources.
 *
 * @module routes/v1/internalRoutes
 */

import { Router } from 'express';
import * as productController from '@/api/v1/internal/product/controller';
import * as categoryController from '@/api/v1/internal/category/controller';

const router = Router();

/**
 * @rule {be-product-routes}
 * Product catalog routes
 */
router.get('/product', productController.listHandler);

/**
 * @rule {be-category-routes}
 * Category navigation routes
 */
router.get('/category', categoryController.listHandler);

export default router;
