/**
 * @summary
 * Lists products with filtering, sorting, and pagination support.
 * Returns products based on category filter, sort criteria, and page parameters.
 *
 * @procedure spProductList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/internal/product
 *
 * @parameters
 * @param {INT} idCategory
 *   - Required: No
 *   - Description: Category filter (NULL for all products)
 *
 * @param {NVARCHAR(50)} sortBy
 *   - Required: Yes
 *   - Description: Sort criteria (name_asc, name_desc, price_asc, price_desc, date_asc, date_desc)
 *
 * @param {INT} page
 *   - Required: Yes
 *   - Description: Page number (1-based)
 *
 * @param {INT} pageSize
 *   - Required: Yes
 *   - Description: Products per page (12, 24, or 48)
 *
 * @testScenarios
 * - List all products with default sorting
 * - Filter products by category
 * - Sort products by name ascending/descending
 * - Sort products by price ascending/descending
 * - Sort products by date ascending/descending
 * - Paginate through product list
 * - Handle invalid sort criteria
 * - Handle invalid page parameters
 */
CREATE OR ALTER PROCEDURE [functional].[spProductList]
  @idCategory INT = NULL,
  @sortBy NVARCHAR(50) = 'date_desc',
  @page INT = 1,
  @pageSize INT = 24
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate page parameters
   * @throw {pageNumberInvalid}
   */
  IF (@page < 1)
  BEGIN
    ;THROW 51000, 'pageNumberInvalid', 1;
  END;

  /**
   * @validation Validate page size
   * @throw {pageSizeInvalid}
   */
  IF (@pageSize NOT IN (12, 24, 48))
  BEGIN
    ;THROW 51000, 'pageSizeInvalid', 1;
  END;

  /**
   * @validation Validate sort criteria
   * @throw {sortCriteriaInvalid}
   */
  IF (@sortBy NOT IN ('name_asc', 'name_desc', 'price_asc', 'price_desc', 'date_asc', 'date_desc'))
  BEGIN
    ;THROW 51000, 'sortCriteriaInvalid', 1;
  END;

  /**
   * @validation Validate category exists if provided
   * @throw {categoryDoesntExist}
   */
  IF (@idCategory IS NOT NULL AND NOT EXISTS (SELECT * FROM [functional].[category] [cat] WHERE [cat].[idCategory] = @idCategory AND [cat].[deleted] = 0))
  BEGIN
    ;THROW 51000, 'categoryDoesntExist', 1;
  END;

  DECLARE @offset INT = (@page - 1) * @pageSize;

  /**
   * @output {ProductList, n, n}
   * @column {INT} idProduct - Product identifier
   * @column {NVARCHAR} name - Product name
   * @column {NVARCHAR} mainImage - Main product image URL
   * @column {INT} idCategory - Category identifier
   * @column {NVARCHAR} categoryName - Category name
   * @column {NUMERIC} price - Product price (nullable)
   * @column {DATETIME2} dateCreated - Product creation date
   * @column {INT} totalCount - Total products matching filter
   */
  SELECT
    [prd].[idProduct],
    [prd].[name],
    [prd].[mainImage],
    [prd].[idCategory],
    [cat].[name] AS [categoryName],
    [prd].[price],
    [prd].[dateCreated],
    COUNT(*) OVER() AS [totalCount]
  FROM [functional].[product] [prd]
    JOIN [functional].[category] [cat] ON ([cat].[idCategory] = [prd].[idCategory])
  WHERE [prd].[deleted] = 0
    AND [cat].[deleted] = 0
    AND ((@idCategory IS NULL) OR ([prd].[idCategory] = @idCategory))
  ORDER BY
    CASE WHEN @sortBy = 'name_asc' THEN [prd].[name] END ASC,
    CASE WHEN @sortBy = 'name_desc' THEN [prd].[name] END DESC,
    CASE WHEN @sortBy = 'price_asc' THEN [prd].[price] END ASC,
    CASE WHEN @sortBy = 'price_desc' THEN [prd].[price] END DESC,
    CASE WHEN @sortBy = 'date_asc' THEN [prd].[dateCreated] END ASC,
    CASE WHEN @sortBy = 'date_desc' THEN [prd].[dateCreated] END DESC
  OFFSET @offset ROWS
  FETCH NEXT @pageSize ROWS ONLY;
END;
GO
