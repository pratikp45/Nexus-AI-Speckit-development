'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Sun, Moon, Bell, Search, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'

interface AdminNavbarProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

export function AdminNavbar({ onMenuClick, sidebarOpen }: AdminNavbarProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('darkMode')
    setDarkMode(savedTheme === 'true')
  }, [])

  const toggleTheme = () => {
    const newTheme = !darkMode
    setDarkMode(newTheme)
    localStorage.setItem('darkMode', newTheme.toString())
    
    // Apply theme to document
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleSignOut = () => {
    // Clear authentication
    localStorage.removeItem('adminAuth')
    document.cookie = 'adminAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out of admin portal.",
    })
    
    router.push('/admin/login')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Mobile menu button */}
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>

        {/* Enhanced Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users, content, settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Enhanced Notifications */}
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              {showNotifications && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              )}
              <span className="sr-only">View notifications</span>
            </Button>
            
            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-lg p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowNotifications(false)}
                  >
                    Clear all
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                    <div>
                      <p className="font-medium text-sm">New user registration</p>
                      <p className="text-xs text-muted-foreground">John Doe signed up 2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                    <div>
                      <p className="font-medium text-sm">System update completed</p>
                      <p className="text-xs text-muted-foreground">Version 2.1.0 deployed successfully</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1"></div>
                    <div>
                      <p className="font-medium text-sm">Payment received</p>
                      <p className="text-xs text-muted-foreground">$99.00 from Premium Plan</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
