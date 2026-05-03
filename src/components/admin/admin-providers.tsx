'use client'

import { AuthProvider } from '@/contexts/auth-context'
import { Toaster } from '@/components/ui/toaster'

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  )
}
