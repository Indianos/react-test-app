import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/format-currency';
import { useEffect, useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { product } from '@/routes';

type Props = {
    items: Product[];
    selectable?: boolean;
    selectedIds?: string[]; // optional controlled mode
    onSelectionChange?: (ids: string[]) => void;
};

export default function ProductTable({
    items,
    selectable = false,
    selectedIds,
    onSelectionChange,
}: Props) {
    const controlled = Array.isArray(selectedIds);
    const [internal, setInternal] = useState<string[]>(selectedIds ?? []);
    // keep internal in sync if controlled changes
    useEffect(() => {
        if (controlled) setInternal(selectedIds as string[]);
    }, [controlled, selectedIds]);

    const selectedSet = useMemo(
        () => new Set(controlled ? (selectedIds as string[]) : internal),
        [controlled, internal, selectedIds],
    );

    const setSelected = (ids: string[]) => {
        if (!controlled) {
            setInternal(ids);
        }
        onSelectionChange?.(ids);
    };

    const toggleOne = (id: string) => {
        if (!selectable) return;
        const next = new Set(selectedSet);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        next.has(id) ? next.delete(id) : next.add(id);
        setSelected(Array.from(next));
    };

    return (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-xs">
                    <tr>
                        {selectable && <th className="p-3" />}
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                            ID
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                            Name
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                            Category
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                            Price
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                            In Stock
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                            Stock Quantity
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                            Rating
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((p) => {
                        const isSelected = selectedSet.has(p.id);
                        return (
                            <tr
                                key={p.id}
                                className={`border-t hover:bg-primary/5 ${
                                    isSelected ? 'bg-primary/15' : ''
                                }`}
                                aria-selected={isSelected}
                            >
                                {selectable && (
                                    <td className="w-1 p-3 align-middle">
                                        <div
                                            className={`h-4 w-4 rounded border ${isSelected ? 'border-primary bg-primary' : 'bg-transparent'}`}
                                            onClick={toggleOne.bind(null, p.id)}
                                        />
                                    </td>
                                )}
                                <td className="px-4 py-3 align-middle font-semibold">
                                    <Link href={product(p.id)}>{p.id}</Link>
                                </td>
                                <td className="px-4 py-3 align-middle text-muted-foreground">
                                    {p.name}
                                </td>
                                <td className="px-4 py-3 align-middle text-muted-foreground">
                                    {p.category}
                                </td>
                                <td className="px-4 py-3 align-middle text-muted-foreground">
                                    {formatCurrency(p.price)}
                                </td>
                                <td className="px-4 py-3 align-middle text-muted-foreground">
                                    {String(p.inStock).charAt(0).toUpperCase() +
                                        String(p.inStock).slice(1)}
                                </td>
                                <td className="px-4 py-3 align-middle text-muted-foreground">
                                    {p.stockQuantity}
                                </td>
                                <td className="px-4 py-3 align-middle text-muted-foreground">
                                    {p.ratings
                                        ? Number(p.ratings.average).toFixed(1)
                                        : '-'}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
