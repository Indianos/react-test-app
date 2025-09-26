import AppHeader from '@/components/app-header';
import CategorySelectFilter from '@/components/category-select-filter';
import NameSelectFilter from '@/components/name-select-filter';
import Pagination from '@/components/pagination';
import ProductGrid from '@/components/product-grid';
import ProductTable from '@/components/product-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types/product';
import { Head } from '@inertiajs/react';
import { Grid2X2, List } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type ViewMode = 'grid' | 'table';

const API_URL: string =
    'https://armandsosins.github.io/home-assignment/random_products.json';

export default function Dashboard() {
    // PRODUCT PROCESSING
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(API_URL, { signal: controller.signal });

                if (!res.ok) {
                    setError(`Request failed: ${res.status} ${res.statusText}`);
                    return;
                }

                const data = (await res.json()) as Product[];
                setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                if ((err as DOMException).name !== 'AbortError') {
                    setError('Network error');
                }
            } finally {
                setLoading(false);
            }
        })();
        return () => controller.abort();
    }, []);

    // SEARCH PROVIDERS
    const availableNames = useMemo(() => {
        const set = new Set<string>();
        products.forEach((p) => set.add(p.name));
        return Array.from(set).sort();
    }, [products]);
    const availableCategories = useMemo(() => {
        const set = new Set<string>();
        products.forEach((p) => p.category && set.add(p.category));
        return Array.from(set).sort();
    }, [products]);

    // FILTERING BY SEARCH
    const [nameQuery, setNameQuery] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const filtered = useMemo(
        () =>
            products.filter(
                (p) =>
                    (!nameQuery || p.name === nameQuery) &&
                    (!selectedCategories.length ||
                        selectedCategories.includes(p.category)),
            ),
        [products, nameQuery, selectedCategories],
    );

    // Pagination (handled by a Pagination component)
    const [pageItems, setPageItems] = useState<Product[]>([]);

    // View mode
    const viewMode = {
        defaultMode: 'grid' as ViewMode,
        storageKey: 'product-view-mode',
        getInit(): ViewMode {
            const stored = sessionStorage.getItem(this.storageKey);
            return stored === 'grid' || stored === 'table'
                ? stored
                : this.defaultMode;
        },
        set(value: ViewMode) {
            sessionStorage.setItem(this.storageKey, value);
            setView(value);
        },
    };
    const [view, setView] = useState<ViewMode>(viewMode.getInit());

    return (
        <AppLayout>
            <Head title="Product Showcase" />
            <AppHeader>
                <nav className="flex gap-2 rounded-lg bg-white p-1">
                    <Button
                        className="cursor-pointer"
                        variant={view === 'table' ? 'default' : 'ghost'}
                        onClick={() => viewMode.set('table')}
                        aria-pressed={view === 'table'}
                    >
                        <List />
                        Table
                    </Button>
                    <Button
                        className="cursor-pointer"
                        variant={view === 'grid' ? 'default' : 'ghost'}
                        onClick={() => viewMode.set('grid')}
                        aria-pressed={view === 'grid'}
                    >
                        <Grid2X2 />
                        Grid
                    </Button>
                </nav>
            </AppHeader>

            {/* Filters */}
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-white p-4">
                <NameSelectFilter
                    available={availableNames}
                    selected={nameQuery}
                    onChange={setNameQuery}
                />

                <CategorySelectFilter
                    available={availableCategories}
                    selected={selectedCategories}
                    add={(v) =>
                        setSelectedCategories([...selectedCategories, v])
                    }
                    remove={(v) =>
                        setSelectedCategories(
                            selectedCategories.filter((c) => c !== v),
                        )
                    }
                />
                <div className="flex-1">
                    <span className="font-semibold text-primary">
                        {selectedCategories.join(', ')}
                    </span>
                </div>

                <button
                    className="font-semibold underline"
                    onClick={() => {
                        setNameQuery('');
                        setSelectedCategories([]);
                    }}
                >
                    Clear Filters
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    Loading products…
                </div>
            ) : error ? (
                <div className="rounded-xl border bg-red-50 p-6 text-red-700 shadow-sm">
                    {error}
                </div>
            ) : pageItems.length === 0 ? (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    No products found.
                </div>
            ) : view === 'grid' ? (
                <ProductGrid items={pageItems} />
            ) : (
                <ProductTable items={pageItems} selectable />
            )}

            {/* Pagination */}
            <Pagination
                resultsArray={filtered}
                className="mt-12"
                pageChanged={setPageItems}
            />
        </AppLayout>
    );
}
