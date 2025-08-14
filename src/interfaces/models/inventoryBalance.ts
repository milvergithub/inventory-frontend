export interface InventoryBalance {
    id: number;
    partnerId: number;
    warehouseId: number;
    productId: number;
    lotId: number;
    quantity: number;
    createdAt?: string;
    createdBy?: number;
    updatedAt?: string;
    updatedBy?: number;
}
