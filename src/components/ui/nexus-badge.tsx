"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const nexusBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm",
        secondary: "border-transparent bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 dark:from-purple-900/30 dark:to-blue-900/30 dark:text-purple-200",
        destructive: "border-transparent bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-sm",
        outline: "border-purple-500/30 text-purple-700 dark:text-purple-300 bg-purple-500/10 backdrop-blur-sm",
        glass: "border-white/20 bg-white/10 backdrop-blur-md text-purple-800 dark:text-purple-200 shadow-sm",
        glow: "border-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface NexusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof nexusBadgeVariants> {}

function NexusBadge({ className, variant, size, ...props }: NexusBadgeProps) {
  return (
    <div className={cn(nexusBadgeVariants({ variant, size }), className)} {...props} />
  )
}

export { NexusBadge, nexusBadgeVariants }
