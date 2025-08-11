import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from "@/components/layout/mainLayout.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MainLayout>
          <div className="p-4">
              <div className="text-3xl">Dashboard content</div>
              <div className="bg-white/30 backdrop-blur-md border border-gray-200/30 rounded-lg p-6 shadow-md">
                  <h2 className="text-lg font-semibold mb-2">Glassmorphism Card</h2>
                  <p className="text-white">Este es un ejemplo de efecto vidrio con Tailwind CSS.</p>
              </div>

          </div>
      </MainLayout>
  </StrictMode>,
)
