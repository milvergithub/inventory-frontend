import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-background">
                <SidebarTrigger />
                <div className="m-8">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}