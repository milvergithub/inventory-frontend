import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {Suspense} from "react";
import {Outlet} from "react-router-dom";

export default function MainLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-background">
                <SidebarTrigger />
                <div className="m-8">
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </div>
            </main>
        </SidebarProvider>
    )
}