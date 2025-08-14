import { useSearchUsers } from "@/hooks/useUser";
import type { UserSearchRequest } from "@/interfaces/searchRequests/userSearchRequest";
import { Sort } from "@/enums/sort";
import DataTable, { type Column } from "@/components/common/dataTable";
import type { User } from "@/interfaces/models/user";
import {EllipsisVertical, User as UserIcon} from "lucide-react";
import { PageTitle } from "@/components/common/pageTitle";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@/components/ui/icon.tsx";

const defaultRequest: UserSearchRequest = {
    sort: { username: Sort.Asc },
    limit: 20,
};

export default function UserListPage() {
    const { data: items } = useSearchUsers(defaultRequest);

    const columns: Column<User>[] = [
        {
            header: "ID",
            cell: (itm: User) => itm.id,
        },
        {
            header: "USERNAME",
            cell: (itm: User) => itm.username,
        },
        {
            header: "EMAIL",
            cell: (itm: User) => itm.email,
        },
        {
            header: "CREATED AT",
            cell: (itm: User) => new Date(itm.createdAt).toLocaleString(),
        },
        {
            header: "",
            cell: (itm: User) => (
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
                icon={UserIcon}
                title="Users"
                description="Explora y gestiona usuarios registrados en el sistema."
            />
            <DataTable columns={columns} items={items} />
        </div>
    );
}
