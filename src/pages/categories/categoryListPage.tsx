import { useSearchCategories } from "@/hooks/useCategory.ts";
import type { CategorySearchRequest } from "@/interfaces/searchRequests/categorySearchRequest.ts";
import { Sort } from "@/enums/sort.ts";
import DataTable, { type Column } from "@/components/common/dataTable.tsx";
import type { Category } from "@/interfaces/models/category.ts";
import { Component } from "lucide-react";
import { PageTitle } from "@/components/common/pageTitle.tsx";

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