export type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    inStock: boolean;
    stockQuantity: number;
    specifications?: Record<string, string>;
    ratings?: { average: number; reviewsCount: number };
    reviews?: Array<{
        user: string;
        rating: number;
        comment: string;
        date: string;
    }>;
    shippingDetails?: {
        weight: string;
        dimensions: string;
        shippingCost: number;
        estimatedDeliveryTime: string;
    };
};
