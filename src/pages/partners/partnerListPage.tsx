import { useSearchPartners } from "@/hooks/usePartner";
import type { PartnerSearchRequest } from "@/interfaces/searchRequests/partnerSearchRequest";
import { Sort } from "@/enums/sort";
import DataTable, { type Column } from "@/components/common/dataTable";
import type { Partner } from "@/interfaces/models/partner";
import {Building, EllipsisVertical} from "lucide-react";
import { PageTitle } from "@/components/common/pageTitle";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@/components/ui/icon.tsx";

const defaultRequest: PartnerSearchRequest = {
    sort: { name: Sort.Asc },
    limit: 20,
};

export default function PartnerListPage() {
    const { data: items } = useSearchPartners(defaultRequest);

    const columns: Column<Partner>[] = [
        {
            header: "ID",
            cell: (itm: Partner) => itm.id,
        },
        {
            header: "NAME",
            cell: (itm: Partner) => itm.user.username,
        },
        {
            header: "EMAIL",
            cell: (itm: Partner) => itm.user.email ?? "-",
        },
        {
            header: "DESCRIPTION",
            cell: (itm: Partner) => itm.description ?? "-",
        },
        {
            header: "",
            cell: (itm: Partner) => (
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
    ];

    return (
        <div className="w-full">
            <PageTitle
                icon={Building}
                title="Partners"
                description="Explora y gestiona los socios comerciales, o añade nuevos usando el botón en la parte superior derecha."
            />
            <DataTable columns={columns} items={items} />
        </div>
    );
}
