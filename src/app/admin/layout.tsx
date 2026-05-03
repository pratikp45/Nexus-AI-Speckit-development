'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminNavbar } from '@/components/admin/admin-navbar'
import { AdminProviders } from '@/components/admin/admin-providers'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AdminProviders>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <AdminSidebar 
            open={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          {/* Main Content */}
          <div className="flex-1 lg:ml-64">
            <AdminNavbar 
              onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
              sidebarOpen={sidebarOpen}
            />
            
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
        
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </AdminProviders>
  )
}
