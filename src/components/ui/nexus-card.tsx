"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface NexusCardProps extends React.ComponentProps<typeof Card> {
  variant?: "default" | "glass" | "gradient" | "glow"
  accent?: "purple" | "blue" | "gradient"
}

const NexusCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  NexusCardProps
>(({ className, variant = "default", accent = "purple", children, ...props }, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "backdrop-blur-md bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10"
      case "gradient":
        return "bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-purple-500/20"
      case "glow":
        return "bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 border-purple-500/20 shadow-lg shadow-purple-500/10"
      default:
        return "bg-card border-border"
    }
  }

  const getAccentClasses = () => {
    switch (accent) {
      case "purple":
        return "border-purple-500/30 shadow-purple-500/10"
      case "blue":
        return "border-blue-500/30 shadow-blue-500/10"
      case "gradient":
        return "border-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30"
      default:
        return ""
    }
  }

  return (
    <Card
      ref={ref}
      className={cn(
        "rounded-2xl transition-all duration-300 hover:shadow-xl",
        getVariantClasses(),
        getAccentClasses(),
        className
      )}
      {...props}
    >
      {children}
    </Card>
  )
})

NexusCard.displayName = "NexusCard"

export { NexusCard }
