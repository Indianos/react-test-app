import { ArrowDownIcon } from '@/components/ui/custom-icons';
import { cn } from '@/lib/utils';
import React, { useEffect, useMemo, useState } from 'react';

export interface PaginationProps<T>
    extends React.HTMLAttributes<HTMLDivElement> {
    resultsArray: T[];
    defaultPerPage?: number;
    perPageOptions?: number[];
    windowSize?: number;
    pageChanged: (results: T[]) => void;
}

export default function Pagination<T>({
    resultsArray,
    defaultPerPage = 10,
    perPageOptions = [10, 20, 30, 50],
    windowSize = 4,
    pageChanged,
    className,
    ...props
}: PaginationProps<T>) {
    // Pagination state
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(defaultPerPage);

    // Derived pagination values
    const totalPages = Math.max(1, Math.ceil(resultsArray.length / perPage));
    const pageSafe = Math.min(Math.max(1, page), totalPages);
    const start = (pageSafe - 1) * perPage;
    const current = useMemo(
        () => resultsArray.slice(start, start + perPage),
        [resultsArray, start, perPage],
    ) as T[];

    // Emit current page slice
    useEffect(() => {
        pageChanged(current);
    }, [pageChanged, current]);

    // Reset the paging if perPage or results change
    useEffect(() => {
        setPage(1);
    }, [totalPages]);

    // Navigation helpers
    const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));
    const prev = () => goTo(pageSafe - 1);
    const next = () => goTo(pageSafe + 1);

    // Determine visible page numbers: first, window around current, last (with ellipses)
    const startPage = Math.max(1, pageSafe - windowSize);
    const endPage = Math.min(totalPages, pageSafe + windowSize);

    // Build pages list excluding duplicates of first/last
    const middlePages: number[] = [];
    for (let p = startPage; p <= endPage; p++) {
        if (p !== 1 && p !== totalPages) middlePages.push(p);
    }

    return (
        <div
            className={cn('flex items-center justify-center gap-2', className)}
            {...props}
        >
            {/* Prev */}
            <PageField
                aria-label="Previous page"
                onClick={pageSafe > 1 ? prev : undefined}
                disabled={pageSafe <= 1}
            >
                <ArrowDownIcon className="rotate-90" />
            </PageField>

            {/* First page */}
            <PageField
                symbol={1}
                active={pageSafe === 1}
                onClick={pageSafe === 1 ? undefined : () => goTo(1)}
                aria-current={pageSafe === 1 ? 'page' : undefined}
            />

            {/* Left ellipsis */}
            {startPage > 2 && (
                <div
                    className="flex h-7 w-7 items-center justify-center"
                    aria-hidden
                >
                    . . .
                </div>
            )}

            {/* Middle window */}
            {middlePages.map((p) => (
                <PageField
                    key={p}
                    symbol={p}
                    active={p === pageSafe}
                    onClick={p === pageSafe ? undefined : () => goTo(p)}
                    aria-current={p === pageSafe ? 'page' : undefined}
                />
            ))}

            {/* Right ellipsis */}
            {endPage < totalPages - 1 && (
                <div
                    className="flex h-7 w-7 items-center justify-center"
                    aria-hidden
                >
                    ...
                </div>
            )}

            {/* Last page */}
            {totalPages > 1 && (
                <PageField
                    symbol={totalPages}
                    active={pageSafe === totalPages}
                    onClick={
                        pageSafe === totalPages
                            ? undefined
                            : () => goTo(totalPages)
                    }
                    aria-current={pageSafe === totalPages ? 'page' : undefined}
                />
            )}

            {/* Next */}
            <PageField
                aria-label="Next page"
                onClick={pageSafe < totalPages ? next : undefined}
                disabled={pageSafe >= totalPages}
            >
                <ArrowDownIcon className="-rotate-90" />
            </PageField>

            {/* Per-page selector */}
            <select
                className="flex h-7 items-center justify-center rounded border border-[#667085] bg-white px-2 text-sm text-black hover:border-primary hover:bg-primary/10"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                aria-label="Items per page"
            >
                {perPageOptions.map((n) => (
                    <option key={n} value={n}>
                        {n} per page
                    </option>
                ))}
            </select>
        </div>
    );
}

interface PageFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    symbol?: string | number | React.ReactNode;
    disabled?: boolean;
    active?: boolean;
}
function PageField({
    symbol,
    disabled = false,
    active = false,
    className,
    children,
    ...rest
}: PageFieldProps) {
    return (
        <div
            {...rest}
            role={rest.onClick && !disabled ? 'button' : rest.role}
            tabIndex={rest.onClick && !disabled ? 0 : rest.tabIndex}
            className={cn(
                'flex h-7 w-7 items-center justify-center rounded border border-[#667085] bg-white text-sm text-black hover:border-primary hover:bg-primary/10',
                active
                    ? 'border-primary bg-primary text-white hover:text-black'
                    : '',
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                className,
            )}
        >
            {symbol ?? children}
        </div>
    );
}
