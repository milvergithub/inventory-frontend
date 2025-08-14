import {
    Sidebar,
    SidebarContent,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Settings, Tag, Package, Users, User } from "lucide-react";

type MenuItem = {
    title: string;
    path: string;
    icon: any
};
// Menu items.
const items: MenuItem[] = [
    {
        title: "Categorias",
        path: "categories",
        icon: Tag,
    },
    {
        title: "Productos",
        path: "products",
        icon: Package,
    },
    {
        title: "Partners",
        path: "partners",
        icon: Users,
    },
    {
        title: "Usuarios",
        path: "users",
        icon: User,
    },
    {
        title: "Suppliers",
        path: "suppliers",
        icon: Users,
    },
    {
        title: "Settings",
        path: "#",
        icon: Settings,
    },
];
export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.path}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}