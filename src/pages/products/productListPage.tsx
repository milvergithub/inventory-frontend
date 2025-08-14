import { useSearchProducts } from "@/hooks/useProduct.ts";
import type { ProductSearchRequest } from "@/interfaces/searchRequests/productSearchRequest.ts";
import { Sort } from "@/enums/sort.ts";
import DataTable, { type Column } from "@/components/common/dataTable.tsx";
import type { Product } from "@/interfaces/models/product.ts";
import {Box, EllipsisVertical} from "lucide-react";
import { PageTitle } from "@/components/common/pageTitle.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@/components/ui/icon.tsx";

const defaultRequest: ProductSearchRequest = {
    sort: { name: Sort.Asc },
    pageSize: 20,
};

export default function ProductListPage() {
    const { data: items } = useSearchProducts(defaultRequest);

    const columns: Column<Product>[] = [
        {
            header: "ID",
            cell: (itm: Product) => itm.id,
        },
        {
            header: "SKU",
            cell: (itm: Product) => itm.sku,
        },
        {
            header: "CODE",
            cell: (itm: Product) => itm.code,
        },
        {
            header: "NAME",
            cell: (itm: Product) => itm.name,
        },
        {
            header: "CATEGORY ID",
            cell: (itm: Product) => itm.categoryId,
        },
        {
            header: "DESCRIPTION",
            cell: (itm: Product) => itm.description ?? "-",
        },
        {
            header: "",
            cell: (item: Product, index: number) => (
                <Button
                    variant="ghost"
                    onClick={() => {
                        console.log(item, index)
                    }}
                >
                    <Icon icon={EllipsisVertical} className="size-6" />
                </Button>
            ),
            className: {
                header: "w-16"
            }
        }
    ];

    return (
        <div className="w-full">
            <PageTitle
                icon={Box}
                title="Productos"
                description="Explora y gestiona productos, o añade nuevos usando el botón en la parte superior derecha."
            />
            <DataTable columns={columns} items={items} />
        </div>
    );
}
