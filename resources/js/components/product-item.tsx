import ProductImage from '@/components/product-image';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/format-currency';

interface Props {
    item: Product;
}
export default function ProductItem({ item }: Props) {
    return (
        <Card>
            <CardContent className="flex gap-2">
                <ProductImage
                    width={340}
                    height={272}
                    alt={item.name}
                    className="rounded"
                />

                <div className="py-2 text-sm/6">
                    <h3 className="font-semibold">{item.id}</h3>
                    <p className="font-semibold text-muted-foreground">
                        Name: {item.name} <br />
                        Category: {item.category} <br />
                        Price: {formatCurrency(item.price)} <br />
                        In Stock: {item.inStock ? 'Yes' : 'No'} <br />
                        Stock Quantity: {item.stockQuantity}
                        <br />
                        Rating: {item.ratings?.average || 'Unknown'}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
