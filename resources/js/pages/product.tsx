import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import AppHeader from '@/components/app-header';
import { home } from '@/routes';
import { ArrowDownIcon } from '@/components/ui/custom-icons';
import { Product as ProductType } from '@/types/product';
import ProductItem from '@/components/product-item';

interface PageProps {
    id: string;
}

const API_URL: string =
    'https://armandsosins.github.io/home-assignment/random_products.json';

export default function Product() {
    const id = String(location.pathname).slice(1);
    console.log(id.slice(1));
    // PRODUCT PROCESSING
    const [products, setProducts] = useState<ProductType[]>([]);
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

                const data = (await res.json()) as ProductType[];
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

    const product = products.find((p) => p.id === id);

    return (
        <AppLayout>
            <Head title="Product Details" />
            <AppHeader />

            <div className="px-1 text-sm font-semibold text-muted-foreground">
                <Link href={home()} className="flex w-min items-center">
                    <ArrowDownIcon className="mr-2 inline-block rotate-90" />
                    Back
                </Link>
            </div>

            <div className="my-2 font-semibold">Product details</div>

            {loading ? (
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    Loading products…
                </div>
            ) : error ? (
                <div className="rounded-lg border bg-red-50 p-6 text-red-700 shadow-sm">
                    {error}
                </div>
            ) : !product ? (
                <div className="rounded-lg border bg-red-50 p-6 text-red-700 shadow-sm">
                    Cannot retrieve product
                </div>
            ) : (
                <ProductItem item={product} />
            )}
        </AppLayout>
    );
}
