import { useSearchCategories } from "@/hooks/useCategory.ts";
import type { CategorySearchRequest } from "@/interfaces/searchRequests/categorySearchRequest.ts";
import { Sort } from "@/enums/sort.ts";
import DataTable, { type Column } from "@/components/common/dataTable.tsx";
import type { Category } from "@/interfaces/models/category.ts";
import {Component, EllipsisVertical} from "lucide-react";
import { PageTitle } from "@/components/common/pageTitle.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@/components/ui/icon.tsx";

const defaultRequest: CategorySearchRequest = {
    sort: { name: Sort.Asc },
    limit: 20,
};
export default function CategoryListPage() {
    const { data: items } = useSearchCategories(defaultRequest);

    const columns: Column<Category>[] = [
        {
            header: "ID",
            cell: (itm: Category) => itm.id
        },
        {
            header: "NAME",
            cell: (itm: Category) => itm.name
        },
        {
            header: "DESCRIPTION",
            cell: (itm: Category) => itm.description
        },
        {
            header: "",
            cell: (itm: Category) => (
                <Button
                    variant="ghost"
                    onClick={() => {
                        console.log(itm)
                    }}
                >
                    <Icon icon={EllipsisVertical} className="size-6" />
                </Button>
            ),
            className: {
                header: "w-16"
            }
        }
    ]
    return (
        <div className="w-full">
            <PageTitle
                icon={Component}
                title="Categorias"
                description="Explora y gestiona categorías, o añade nuevas usando el botón en la parte superior derecha."
            />
            <DataTable columns={columns} items={items} />
        </div>
    );
}