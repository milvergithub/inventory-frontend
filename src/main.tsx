import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from "@/components/layout/mainLayout.tsx";
import CategoryListPage from "@/pages/categories/categoryListPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MainLayout>
          <QueryClientProvider client={queryClient}>
              <CategoryListPage />
          </QueryClientProvider>
      </MainLayout>
  </StrictMode>,
)
