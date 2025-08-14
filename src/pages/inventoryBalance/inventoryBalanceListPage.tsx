import DataTable, { type Column } from "@/components/common/dataTable";
import { useSearchInventoryBalances } from "@/hooks/useInventoryBalance";
import { Box, EllipsisVertical } from "lucide-react";
import { PageTitle } from "@/components/common/pageTitle";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { InventoryBalance } from "@/interfaces/models/inventoryBalance";

export default function InventoryBalanceListPage() {
    const { data: items } = useSearchInventoryBalances();

    const columns: Column<InventoryBalance>[] = [
        { header: "ID", cell: (itm) => itm.id },
        { header: "Partner ID", cell: (itm) => itm.partnerId },
        { header: "Warehouse ID", cell: (itm) => itm.warehouseId },
        { header: "Product ID", cell: (itm) => itm.productId },
        { header: "Lot ID", cell: (itm) => itm.lotId },
        { header: "Quantity", cell: (itm) => itm.quantity },
        {
            header: "",
            cell: (item, index) => (
                <Button
                    variant="ghost"
                    onClick={() => console.log(item, index)}
                >
                    <Icon icon={EllipsisVertical} className="size-6" />
                </Button>
            ),
            className: { header: "w-16" }
        }
    ];

    return (
        <div className="w-full">
            <PageTitle
                icon={Box}
                title="Inventory Balances"
                description="Lista de inventario por partner, warehouse, producto y lote."
            />
            <DataTable columns={columns} items={items} />
        </div>
    );
}
