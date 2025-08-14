export interface Product {
    id: number;
    sku: string;
    code: string;
    categoryId: number;
    name: string;
    description: string | null;
    createdAt: string;
    createdBy: string | null;
    updatedAt: string;
    updatedBy: string | null;
}
