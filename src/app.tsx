import {createBrowserRouter} from "react-router-dom";
import CategoryListPage from "@/pages/categories/categoryListPage.tsx";
import MainLayout from "@/components/layout/mainLayout.tsx";
import DashboardPage from "@/pages/dashboard/dashboardPage.tsx";
import ErrorPage from "@/components/common/errorPage.tsx";
import ProductListPage from "@/pages/products/productListPage.tsx";
import PartnerListPage from "@/pages/partners/partnerListPage.tsx";
import UserListPage from "@/pages/users/userListPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <DashboardPage />
            },
            {
                path: "categories",
                element: <CategoryListPage />
            },
            {
                path: "products",
                element: <ProductListPage />
            },
            {
                path: "partners",
                element: <PartnerListPage />
            },
            {
                path: "users",
                element: <UserListPage />
            }
        ]
    },
    {
        path: "/about",
        element: <h1>About</h1>,
    },
]);