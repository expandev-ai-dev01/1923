/**
 * @summary
 * Lists all active categories with their hierarchy information.
 * Returns categories ordered by display order with parent-child relationships.
 *
 * @procedure spCategoryList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/internal/category
 *
 * @testScenarios
 * - List all categories with hierarchy
 * - Verify display order sorting
 * - Check parent-child relationships
 */
CREATE OR ALTER PROCEDURE [functional].[spCategoryList]
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @output {CategoryList, n, n}
   * @column {INT} idCategory - Category identifier
   * @column {NVARCHAR} name - Category name
   * @column {NVARCHAR} description - Category description
   * @column {NVARCHAR} icon - Category icon URL (nullable)
   * @column {INT} displayOrder - Display order
   * @column {INT} idParent - Parent category identifier (nullable)
   * @column {NVARCHAR} parentName - Parent category name (nullable)
   */
  SELECT
    [cat].[idCategory],
    [cat].[name],
    [cat].[description],
    [cat].[icon],
    [cat].[displayOrder],
    [cat].[idParent],
    [catPar].[name] AS [parentName]
  FROM [functional].[category] [cat]
    LEFT JOIN [functional].[category] [catPar] ON ([catPar].[idCategory] = [cat].[idParent] AND [catPar].[deleted] = 0)
  WHERE [cat].[deleted] = 0
  ORDER BY
    [cat].[displayOrder],
    [cat].[name];
END;
GO
