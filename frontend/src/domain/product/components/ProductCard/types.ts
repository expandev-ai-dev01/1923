import type { Product } from '../../types';

export interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}
