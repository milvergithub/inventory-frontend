import { useQuery, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { Warehouse } from "@/interfaces/models/warehouse";
import { getWarehouseAsync, createWarehouseAsync, deleteWarehouseAsync, searchWarehousesAsync } from "@/repos/warehouseRepo";
import type { WarehouseSearchRequest } from "@/interfaces/searchRequests/warehouseSearchRequest.ts";

export function useGetWarehouse(id?: number) {
    return useQuery<Warehouse, AxiosError>({
        queryKey: ["warehouses", id],
        queryFn: async () => await getWarehouseAsync(id!),
        enabled: !!id,
    });
}

export function useSearchWarehouses(params?: WarehouseSearchRequest) {
    return useQuery<Warehouse[], AxiosError>({
        queryKey: ["warehouses", params],
        queryFn: async () => await searchWarehousesAsync(params),
    });
}

export function useCreateWarehouse() {
    return useMutation<Warehouse, AxiosError, Warehouse>({
        mutationFn: async (data) => await createWarehouseAsync(data),
    });
}

export function useDeleteWarehouse() {
    return useMutation<boolean, AxiosError, number>({
        mutationFn: async (id) => await deleteWarehouseAsync(id),
    });
}
