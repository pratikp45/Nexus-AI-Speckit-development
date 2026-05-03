'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Shield,
  LogOut,
  Home,
  DollarSign,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Leads', href: '/admin/leads', icon: BarChart3 },
  { name: 'Testimonials', href: '/admin/testimonials', icon: FileText },
  { name: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { name: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-500 ease-in-out lg:hidden",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col backdrop-blur-2xl bg-gradient-to-b from-white/10 via-white/5 to-black/10 dark:from-black/30 dark:via-black/20 dark:to-black/40 border-r border-purple-500/20 shadow-2xl">
          {/* Mobile header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-purple-500/20 backdrop-blur-sm bg-gradient-to-r from-purple-500/5 to-blue-500/5">
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">Admin Portal</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-purple-400 dark:text-purple-300 hover:bg-purple-500/20 hover:text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 rounded-lg">
              ×
            </Button>
          </div>
          
          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-500 relative overflow-hidden group",
                      isActive 
                        ? "bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 text-white shadow-xl shadow-purple-500/40 scale-[1.02]" 
                        : "text-purple-300 dark:text-purple-200 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] hover:text-white"
                    )}
                    onClick={onClose}
                  >
                    {/* Active state gradient overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-100 animate-pulse" />
                    )}
                    
                    {/* Hover gradient overlay */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-30 transition-all duration-500",
                      isActive && "opacity-50"
                    )} />
                    
                    {/* Glow effect for active item */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-30 blur-xl animate-pulse" />
                    )}
                    
                    {/* Icon with glow effect */}
                    <item.icon className={cn(
                      "h-5 w-5 relative z-10 transition-all duration-300",
                      isActive && "text-white drop-shadow-lg drop-shadow-purple-500/50",
                      "group-hover:text-white group-hover:drop-shadow-lg group-hover:drop-shadow-purple-500/50"
                    )} />
                    
                    {/* Text */}
                    <span className="relative z-10 font-medium">{item.name}</span>
                    
                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>
          
          {/* Mobile footer */}
          <div className="p-4 border-t border-purple-500/20 space-y-2 backdrop-blur-sm bg-gradient-to-r from-purple-500/5 to-blue-500/5">
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full justify-start text-purple-300 dark:text-purple-200 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] hover:text-white transition-all duration-500 rounded-lg">
                <Home className="h-4 w-4 mr-2 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-lg group-hover:drop-shadow-purple-500/50" />
                Back to Site
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-red-400 dark:text-red-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-orange-500/20 hover:shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] hover:text-white transition-all duration-500 rounded-lg">
              <LogOut className="h-4 w-4 mr-2 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-lg group-hover:drop-shadow-red-500/50" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto">
        <div className="flex h-full flex-col backdrop-blur-2xl bg-gradient-to-b from-white/5 via-white/3 to-black/10 dark:from-black/40 dark:via-black/30 dark:to-black/50 border-r border-purple-500/20 shadow-2xl">
          {/* Desktop header */}
          <div className="flex h-16 items-center px-6 border-b border-purple-500/20 backdrop-blur-sm bg-gradient-to-r from-purple-500/5 to-blue-500/5">
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">Admin Portal</h2>
          </div>
          
          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-500 relative overflow-hidden group",
                      isActive 
                        ? "bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 text-white shadow-xl shadow-purple-500/40 scale-[1.02]" 
                        : "text-purple-300 dark:text-purple-200 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] hover:text-white"
                    )}
                  >
                    {/* Active state gradient overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-100 animate-pulse" />
                    )}
                    
                    {/* Hover gradient overlay */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-30 transition-all duration-500",
                      isActive && "opacity-50"
                    )} />
                    
                    {/* Glow effect for active item */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-30 blur-xl animate-pulse" />
                    )}
                    
                    {/* Icon with glow effect */}
                    <item.icon className={cn(
                      "h-5 w-5 relative z-10 transition-all duration-300",
                      isActive && "text-white drop-shadow-lg drop-shadow-purple-500/50",
                      "group-hover:text-white group-hover:drop-shadow-lg group-hover:drop-shadow-purple-500/50"
                    )} />
                    
                    {/* Text */}
                    <span className="relative z-10 font-medium">{item.name}</span>
                    
                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>
          
          {/* Desktop footer */}
          <div className="p-4 border-t border-purple-500/20 space-y-2 backdrop-blur-sm bg-gradient-to-r from-purple-500/5 to-blue-500/5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-purple-300 dark:text-purple-200 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] hover:text-white transition-all duration-500 rounded-lg">
                  <Avatar className="h-6 w-6 mr-2 ring-2 ring-purple-500/30 transition-all duration-300">
                    <AvatarImage src="/avatars/01.png" alt="@admin" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 via-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30">AD</AvatarFallback>
                  </Avatar>
                  Admin User
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 backdrop-blur-2xl bg-white/10 dark:bg-black/30 border-purple-500/20 shadow-xl shadow-purple-500/20" align="start" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-purple-100">Admin User</p>
                    <p className="text-xs leading-none text-purple-300">
                      admin@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-purple-500/20" />
                <DropdownMenuItem className="text-purple-300 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:text-white focus:bg-gradient-to-r focus:from-purple-500/20 focus:to-blue-500/20 transition-all duration-300">Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-purple-300 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:text-white focus:bg-gradient-to-r focus:from-purple-500/20 focus:to-blue-500/20 transition-all duration-300">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-purple-500/20" />
                <DropdownMenuItem className="text-red-400 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-orange-500/20 hover:text-white focus:bg-gradient-to-r focus:from-red-500/20 focus:to-orange-500/20 transition-all duration-300">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full justify-start text-purple-300 dark:text-purple-200 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] hover:text-white transition-all duration-500 rounded-lg">
                <Home className="h-4 w-4 mr-2 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-lg group-hover:drop-shadow-purple-500/50" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
