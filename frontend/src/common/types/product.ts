export interface IProduct {
    _id?: number | string;
    name: string;
    price: number;
    category: string | { _id: string; name: string };
    gallery: string[];
    image: string;
    description: string;
    discount: number;
    countInStock: number;
    featured: boolean;
}

export type ProductQueryType = Omit<IProduct, "category"> & {
    category: { _id: string; name: string };
};
