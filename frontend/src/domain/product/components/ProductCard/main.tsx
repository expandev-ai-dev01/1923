/**
 * @component ProductCard
 * @domain product
 * @description Card component for displaying product information
 */

import { Card, CardContent } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { cn } from '@/core/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ProductCardProps } from './types';

function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const isGridMode = viewMode === 'grid';

  return (
    <Card
      className={cn(
        'group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg',
        isGridMode ? 'flex-col' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'bg-muted relative overflow-hidden',
          isGridMode ? 'aspect-square w-full' : 'h-full w-48 shrink-0'
        )}
      >
        <img
          src={product.mainImage}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent
        className={cn('flex flex-col gap-2', isGridMode ? 'p-4' : 'flex-1 justify-between p-4')}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-base font-semibold leading-tight">{product.name}</h3>
          </div>
          <Badge variant="secondary" className="w-fit">
            {product.category}
          </Badge>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          {product.price && (
            <span className="text-primary text-lg font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price)}
            </span>
          )}
          <span className="text-muted-foreground text-xs">
            {format(new Date(product.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProductCard };
