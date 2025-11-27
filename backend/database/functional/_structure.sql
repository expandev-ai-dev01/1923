/**
 * @schema functional
 * Business logic schema for Lozorio Móveis catalog system
 */
CREATE SCHEMA [functional];
GO

/**
 * @table category Brief description: Product categories for furniture organization
 * @multitenancy false
 * @softDelete true
 * @alias cat
 */
CREATE TABLE [functional].[category] (
  [idCategory] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [description] NVARCHAR(500) NOT NULL DEFAULT (''),
  [icon] NVARCHAR(500) NULL,
  [displayOrder] INTEGER NOT NULL DEFAULT (0),
  [idParent] INTEGER NULL,
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);
GO

/**
 * @table product Brief description: Furniture products in the catalog
 * @multitenancy false
 * @softDelete true
 * @alias prd
 */
CREATE TABLE [functional].[product] (
  [idProduct] INTEGER IDENTITY(1, 1) NOT NULL,
  [idCategory] INTEGER NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [description] NVARCHAR(500) NOT NULL DEFAULT (''),
  [mainImage] NVARCHAR(500) NOT NULL,
  [price] NUMERIC(18, 6) NULL,
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);
GO

/**
 * @primaryKey pkCategory
 * @keyType Object
 */
ALTER TABLE [functional].[category]
ADD CONSTRAINT [pkCategory] PRIMARY KEY CLUSTERED ([idCategory]);
GO

/**
 * @primaryKey pkProduct
 * @keyType Object
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [pkProduct] PRIMARY KEY CLUSTERED ([idProduct]);
GO

/**
 * @foreignKey fkProduct_Category Relationship between product and its category
 * @target functional.category
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [fkProduct_Category] FOREIGN KEY ([idCategory])
REFERENCES [functional].[category]([idCategory]);
GO

/**
 * @foreignKey fkCategory_Parent Self-referencing relationship for category hierarchy
 * @target functional.category
 */
ALTER TABLE [functional].[category]
ADD CONSTRAINT [fkCategory_Parent] FOREIGN KEY ([idParent])
REFERENCES [functional].[category]([idCategory]);
GO

/**
 * @index ixCategory_DisplayOrder Index for category ordering
 * @type Performance
 */
CREATE NONCLUSTERED INDEX [ixCategory_DisplayOrder]
ON [functional].[category]([displayOrder])
WHERE [deleted] = 0;
GO

/**
 * @index ixCategory_Parent Index for parent category lookups
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixCategory_Parent]
ON [functional].[category]([idParent])
WHERE [deleted] = 0;
GO

/**
 * @index ixProduct_Category Index for category-based product filtering
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixProduct_Category]
ON [functional].[product]([idCategory])
INCLUDE ([name], [mainImage], [price])
WHERE [deleted] = 0;
GO

/**
 * @index ixProduct_DateCreated Index for date-based product sorting
 * @type Performance
 */
CREATE NONCLUSTERED INDEX [ixProduct_DateCreated]
ON [functional].[product]([dateCreated] DESC)
INCLUDE ([idCategory], [name], [mainImage], [price])
WHERE [deleted] = 0;
GO

/**
 * @index ixProduct_Name Index for name-based product sorting
 * @type Performance
 */
CREATE NONCLUSTERED INDEX [ixProduct_Name]
ON [functional].[product]([name])
INCLUDE ([idCategory], [mainImage], [price])
WHERE [deleted] = 0;
GO

/**
 * @index ixProduct_Price Index for price-based product sorting
 * @type Performance
 */
CREATE NONCLUSTERED INDEX [ixProduct_Price]
ON [functional].[product]([price])
INCLUDE ([idCategory], [name], [mainImage])
WHERE [deleted] = 0 AND [price] IS NOT NULL;
GO
