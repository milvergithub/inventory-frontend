import { Sort } from "@/enums/sort.ts";
import DataTable, { type Column } from "@/components/common/dataTable.tsx";
import {Box, EllipsisVertical} from "lucide-react";
import { PageTitle } from "@/components/common/pageTitle.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@/components/ui/icon.tsx";
import {useSearchSuppliers} from "@/hooks/useSupplier.ts";
import type {Supplier} from "@/interfaces/models/supplier.ts";
import type {SupplierSearchRequest} from "@/interfaces/searchRequests/supplierSearchRequest.ts";

const defaultRequest: SupplierSearchRequest = {
    sort: { name: Sort.Asc },
    limit: 20,
};

export default function SupplierListPage() {
    const { data: items } = useSearchSuppliers(defaultRequest);

    const columns: Column<Supplier>[] = [
        {
            header: "ID",
            cell: (itm: Supplier) => itm.id,
        },
        {
            header: "NAME",
            cell: (itm: Supplier) => itm.name,
        },
        {
            header: "ADDRESS",
            cell: (itm: Supplier) => itm.address,
        },
        {
            header: "EMAIL",
            cell: (itm: Supplier) => itm.email,
        },
        {
            header: "",
            cell: (item: Supplier, index: number) => (
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
                title="Suppliers"
                description="Explora y gestiona suppliers, o añade nuevos usando el botón en la parte superior derecha."
            />
            <DataTable columns={columns} items={items} />
        </div>
    );
}
