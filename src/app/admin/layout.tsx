'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import '@/styles/admin.css'

// Dynamic imports to avoid build-time context issues
const AdminSidebar = dynamic(() => import('@/components/admin/admin-sidebar').then(mod => ({ default: mod.AdminSidebar })), {
  ssr: false
})
const AdminNavbar = dynamic(() => import('@/components/admin/admin-navbar').then(mod => ({ default: mod.AdminNavbar })), {
  ssr: false
})
const AdminProviders = dynamic(() => import('@/components/admin/admin-providers').then(mod => ({ default: mod.AdminProviders })), {
  ssr: false
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AdminProviders>
      <div className="min-h-screen admin-dashboard">
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
            
            <main className="p-6 nexus-fade-in admin-content">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
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
