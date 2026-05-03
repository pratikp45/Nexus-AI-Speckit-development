"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Search, 
  Database, 
  Wifi, 
  Shield, 
  Clock,
  FileText,
  Users,
  Settings
} from "lucide-react"

// General error state
export function ErrorState({ 
  title = "Something went wrong", 
  description = "An error occurred while loading this content. Please try again later.",
  action,
  onRetry
}: { 
  title?: string
  description?: string
  action?: string
  onRetry?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {action || "Try Again"}
          </Button>
        )}
      </div>
    </div>
  )
}

// Network error state
export function NetworkErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Network Error"
      description="Unable to connect to the server. Please check your internet connection and try again."
      action="Retry Connection"
      onRetry={onRetry}
    />
  )
}

// Empty state for tables
export function EmptyState({ 
  icon,
  title = "No data available",
  description = "There are no items to display at this time.",
  action,
  onAction
}: { 
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: string
  onAction?: () => void 
}) {
  const defaultIcon = <Database className="h-12 w-12 text-muted-foreground" />
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          {icon || defaultIcon}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {onAction && (
          <Button variant="outline" onClick={onAction} className="gap-2">
            {action || "Add Item"}
          </Button>
        )}
      </div>
    </div>
  )
}

// Specific empty states
export function EmptyUsersState({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<Users className="h-12 w-12 text-muted-foreground" />}
      title="No users yet"
      description="Get started by adding your first user to the system."
      action="Add User"
      onAction={onAdd}
    />
  )
}

export function EmptyLeadsState({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-12 w-12 text-muted-foreground" />}
      title="No leads yet"
      description="No contact form submissions have been received yet."
      action="Import Sample Data"
      onAction={onAdd}
    />
  )
}

export function EmptyTestimonialsState({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-12 w-12 text-muted-foreground" />}
      title="No testimonials yet"
      description="Start building trust by adding customer testimonials."
      action="Add Testimonial"
      onAction={onAdd}
    />
  )
}

export function EmptyFAQState({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<FileText className="h-12 w-12 text-muted-foreground" />}
      title="No FAQs yet"
      description="Help your customers by adding frequently asked questions."
      action="Add FAQ"
      onAction={onAdd}
    />
  )
}

export function EmptyPricingState({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<Settings className="h-12 w-12 text-muted-foreground" />}
      title="No pricing plans yet"
      description="Create pricing plans to offer your customers different options."
      action="Add Pricing Plan"
      onAction={onAdd}
    />
  )
}

// Loading state with skeleton
export function LoadingState({ 
  title = "Loading...",
  description = "Please wait while we load your content."
}: { 
  title?: string
  description?: string 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}

// Not found state
export function NotFoundState({ 
  title = "Page not found",
  description = "The page you're looking for doesn't exist or has been moved.",
  action = "Go Home",
  onAction
}: { 
  title?: string
  description?: string
  action?: string
  onAction?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {onAction && (
          <Button onClick={onAction} className="gap-2">
            <Home className="h-4 w-4" />
            {action}
          </Button>
        )}
      </div>
    </div>
  )
}

// Unauthorized state
export function UnauthorizedState({ onLogin }: { onLogin?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
          <Shield className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Access Denied</h3>
          <p className="text-muted-foreground">
            You don't have permission to access this resource. Please contact your administrator if you think this is a mistake.
          </p>
        </div>
        {onLogin && (
          <Button onClick={onLogin} className="gap-2">
            <Shield className="h-4 w-4" />
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}

// Maintenance state
export function MaintenanceState({ 
  title = "Under Maintenance",
  description = "We're currently performing some updates. Please check back soon."
}: { 
  title?: string
  description?: string 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
          <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Wifi className="h-4 w-4" />
          <span>We'll be back shortly</span>
        </div>
      </div>
    </div>
  )
}

// Card-based error state
export function CardErrorState({ 
  title = "Error loading content",
  description = "There was an error loading this content. Please try again.",
  onRetry
}: { 
  title?: string
  description?: string
  onRetry?: () => void 
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {onRetry && (
          <Button variant="outline" onClick={onRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Inline error state for small areas
export function InlineErrorState({ 
  message = "Failed to load",
  onRetry
}: { 
  message?: string
  onRetry?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-2">
      <AlertTriangle className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground text-center">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </Button>
      )}
    </div>
  )
}
