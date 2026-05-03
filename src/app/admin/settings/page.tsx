'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  User,
  Lock,
  Palette,
  Settings,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Globe,
  Database,
  RefreshCw,
  Check,
  X
} from 'lucide-react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Define types
type ProfileSettings = {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  bio: string
  avatar: string
  timezone: string
  language: string
}

type PasswordSettings = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

type ThemeSettings = {
  theme: 'light' | 'dark' | 'system'
  accentColor: string
  fontSize: 'small' | 'medium' | 'large'
  sidebarCollapsed: boolean
  animationsEnabled: boolean
}

type SystemSettings = {
  siteName: string
  siteUrl: string
  adminEmail: string
  maintenanceMode: boolean
  debugMode: boolean
  maxUploadSize: number
  sessionTimeout: number
  emailNotifications: boolean
  autoBackup: boolean
}

// Zod schemas
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  avatar: z.string().optional(),
  timezone: z.string().min(1, "Timezone is required"),
  language: z.string().min(1, "Language is required"),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const themeSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  accentColor: z.string().min(1, "Accent color is required"),
  fontSize: z.enum(['small', 'medium', 'large']),
  sidebarCollapsed: z.boolean(),
  animationsEnabled: z.boolean(),
})

const systemSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters").max(100, "Site name must be less than 100 characters"),
  siteUrl: z.string().url("Invalid URL"),
  adminEmail: z.string().email("Invalid email address"),
  maintenanceMode: z.boolean(),
  debugMode: z.boolean(),
  maxUploadSize: z.number().min(1, "Max upload size must be at least 1MB"),
  sessionTimeout: z.number().min(5, "Session timeout must be at least 5 minutes"),
  emailNotifications: z.boolean(),
  autoBackup: z.boolean(),
})

type ProfileFormValues = z.infer<typeof profileSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>
type ThemeFormValues = z.infer<typeof themeSchema>
type SystemFormValues = z.infer<typeof systemSchema>

// Mock data
const defaultProfile: ProfileSettings = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Experienced administrator managing the Nexus AI platform.',
  avatar: '/avatars/admin.jpg',
  timezone: 'America/Los_Angeles',
  language: 'en',
}

const defaultTheme: ThemeSettings = {
  theme: 'system',
  accentColor: '#3b82f6',
  fontSize: 'medium',
  sidebarCollapsed: false,
  animationsEnabled: true,
}

const defaultSystem: SystemSettings = {
  siteName: 'Nexus AI',
  siteUrl: 'https://nexus-ai.com',
  adminEmail: 'admin@nexus-ai.com',
  maintenanceMode: false,
  debugMode: false,
  maxUploadSize: 10,
  sessionTimeout: 30,
  emailNotifications: true,
  autoBackup: true,
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null)

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultProfile,
  })

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  // Theme form
  const themeForm = useForm<ThemeFormValues>({
    resolver: zodResolver(themeSchema),
    defaultValues: defaultTheme,
  })

  // System form
  const systemForm = useForm<SystemFormValues>({
    resolver: zodResolver(systemSchema),
    defaultValues: defaultSystem,
  })

  const handleSave = async (section: string) => {
    setIsSaving(true)
    setSaveStatus(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      let data: any
      switch (section) {
        case 'profile':
          data = profileForm.getValues()
          localStorage.setItem('adminProfile', JSON.stringify(data))
          break
        case 'theme':
          data = themeForm.getValues()
          localStorage.setItem('adminTheme', JSON.stringify(data))
          // Apply theme changes
          if (data.theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else if (data.theme === 'light') {
            document.documentElement.classList.remove('dark')
          }
          break
        case 'system':
          data = systemForm.getValues()
          localStorage.setItem('systemSettings', JSON.stringify(data))
          break
      }

      setSaveStatus({ success: true, message: `${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!` })
    } catch (error) {
      setSaveStatus({ success: false, message: 'Failed to save settings. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async (data: PasswordFormValues) => {
    setIsSaving(true)
    setSaveStatus(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // In a real app, you would validate current password and update it
      console.log('Password change requested:', data)

      setSaveStatus({ success: true, message: 'Password changed successfully!' })
      setShowPasswordDialog(false)
      passwordForm.reset()
    } catch (error) {
      setSaveStatus({ success: false, message: 'Failed to change password. Please check your current password.' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        {saveStatus && (
          <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
            saveStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {saveStatus.success ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            {saveStatus.message}
          </div>
        )}
      </div>

      {/* Settings Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Update your personal information and preferences.
                  </CardDescription>
                </div>
                <Button onClick={() => handleSave('profile')} disabled={isSaving}>
                  {isSaving ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileForm.watch("avatar")} alt="Profile" />
                    <AvatarFallback>
                      {profileForm.watch("firstName")?.[0]}{profileForm.watch("lastName")?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button type="button" variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...profileForm.register("firstName")}
                      placeholder="John"
                    />
                    {profileForm.formState.errors.firstName && (
                      <p className="text-sm text-destructive">{profileForm.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...profileForm.register("lastName")}
                      placeholder="Doe"
                    />
                    {profileForm.formState.errors.lastName && (
                      <p className="text-sm text-destructive">{profileForm.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      {...profileForm.register("email")}
                      placeholder="john@example.com"
                      className="pl-10"
                    />
                  </div>
                  {profileForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{profileForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        {...profileForm.register("phone")}
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        {...profileForm.register("location")}
                        placeholder="San Francisco, CA"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    {...profileForm.register("bio")}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                  {profileForm.formState.errors.bio && (
                    <p className="text-sm text-destructive">{profileForm.formState.errors.bio.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      {...profileForm.register("timezone")}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      {...profileForm.register("language")}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Settings */}
        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Password Settings</CardTitle>
                  <CardDescription>
                    Change your password to keep your account secure.
                  </CardDescription>
                </div>
                <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>
                        Enter your current password and choose a new password.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            {...passwordForm.register("currentPassword")}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {passwordForm.formState.errors.currentPassword && (
                          <p className="text-sm text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            {...passwordForm.register("newPassword")}
                            placeholder="Enter new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {passwordForm.formState.errors.newPassword && (
                          <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            {...passwordForm.register("confirmPassword")}
                            placeholder="Confirm new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {passwordForm.formState.errors.confirmPassword && (
                          <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
                        )}
                      </div>

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setShowPasswordDialog(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                          {isSaving ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="mr-2 h-4 w-4" />
                          )}
                          Change Password
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Password Strength</h4>
                      <p className="text-sm text-muted-foreground">Your password meets security requirements</p>
                    </div>
                  </div>
                  <Badge variant="outline">Strong</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Last Changed</h4>
                      <p className="text-sm text-muted-foreground">Password was last changed 30 days ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">30 days ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Settings */}
        <TabsContent value="theme" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Theme Preferences</CardTitle>
                  <CardDescription>
                    Customize the appearance of your admin panel.
                  </CardDescription>
                </div>
                <Button onClick={() => handleSave('theme')} disabled={isSaving}>
                  {isSaving ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Theme
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {(['light', 'dark', 'system'] as const).map((theme) => (
                      <div key={theme} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={theme}
                          {...themeForm.register("theme")}
                          className="w-4 h-4"
                        />
                        <Label className="capitalize">{theme}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="accentColor"
                      {...themeForm.register("accentColor")}
                      placeholder="#3b82f6"
                      className="w-32"
                    />
                    <div 
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: themeForm.watch("accentColor") }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={size}
                          {...themeForm.register("fontSize")}
                          className="w-4 h-4"
                        />
                        <Label className="capitalize">{size}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sidebar Collapsed</h4>
                      <p className="text-sm text-muted-foreground">Keep sidebar collapsed by default</p>
                    </div>
                    <Switch
                      checked={themeForm.watch("sidebarCollapsed")}
                      onCheckedChange={(checked) => themeForm.setValue("sidebarCollapsed", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Animations</h4>
                      <p className="text-sm text-muted-foreground">Enable UI animations and transitions</p>
                    </div>
                    <Switch
                      checked={themeForm.watch("animationsEnabled")}
                      onCheckedChange={(checked) => themeForm.setValue("animationsEnabled", checked)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure system-wide settings and preferences.
                  </CardDescription>
                </div>
                <Button onClick={() => handleSave('system')} disabled={isSaving}>
                  {isSaving ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save System
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      {...systemForm.register("siteName")}
                      placeholder="Nexus AI"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input
                      id="siteUrl"
                      {...systemForm.register("siteUrl")}
                      placeholder="https://nexus-ai.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="adminEmail"
                      type="email"
                      {...systemForm.register("adminEmail")}
                      placeholder="admin@nexus-ai.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
                    <Input
                      id="maxUploadSize"
                      type="number"
                      {...systemForm.register("maxUploadSize", { valueAsNumber: true })}
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      {...systemForm.register("sessionTimeout", { valueAsNumber: true })}
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Maintenance Mode</h4>
                      <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                    </div>
                    <Switch
                      checked={systemForm.watch("maintenanceMode")}
                      onCheckedChange={(checked) => systemForm.setValue("maintenanceMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Debug Mode</h4>
                      <p className="text-sm text-muted-foreground">Enable debug logging and error reporting</p>
                    </div>
                    <Switch
                      checked={systemForm.watch("debugMode")}
                      onCheckedChange={(checked) => systemForm.setValue("debugMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Send system notifications via email</p>
                    </div>
                    <Switch
                      checked={systemForm.watch("emailNotifications")}
                      onCheckedChange={(checked) => systemForm.setValue("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto Backup</h4>
                      <p className="text-sm text-muted-foreground">Automatically backup system data</p>
                    </div>
                    <Switch
                      checked={systemForm.watch("autoBackup")}
                      onCheckedChange={(checked) => systemForm.setValue("autoBackup", checked)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
