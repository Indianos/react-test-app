import ProductImage from '@/components/product-image';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/format-currency';

type Props = {
    items: Product[];
};

export default function ProductGrid({ items }: Props) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
                <article
                    key={p.id}
                    className="overflow-hidden rounded-lg bg-white p-2 shadow-sm"
                >
                    <ProductImage
                        width={800}
                        height={480}
                        random={p.id}
                        className="h-40 w-full rounded-lg object-cover sm:h-44"
                        alt={p.name}
                    />

                    <div
                        className="mt-4 font-semibold"
                        style={{ lineHeight: '1em' }}
                    >
                        ID: {p.id}
                    </div>

                    <div className="mt-3 font-semibold text-muted-foreground">
                        Price: {formatCurrency(p.price)}
                    </div>

                    <div className="mt-3 font-semibold text-muted-foreground">
                        Stock Quantity:{' '}
                        {p.inStock ? p.stockQuantity : '(Out of stock)'}
                    </div>
                </article>
            ))}
        </div>
    );
}
