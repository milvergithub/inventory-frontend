import { Sort } from "@/enums/sort";
import type { PaginationRequest } from "@/interfaces/paginationRequest";
import type { InventoryBalance } from "@/interfaces/models/inventoryBalance";

export interface InventoryBalanceSearchRequest extends PaginationRequest {
    sort?: { [key in SortBy]?: Sort };
    partnerId?: number;
    warehouseId?: number;
    productId?: number;
    lotId?: number;
}

type SortBy = keyof Pick<InventoryBalance, "id" | "partnerId" | "warehouseId" | "productId" | "lotId" | "quantity">;
