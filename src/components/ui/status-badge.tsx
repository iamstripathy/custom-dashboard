
import * as React from "react"
import { cn } from "@/lib/utils"

type StatusVariant = "draft" | "pending" | "approved" | "rejected" | "completed"

const variantStyles: Record<StatusVariant, string> = {
  draft: "bg-secondary text-secondary-foreground",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
  rejected: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
}

const variantIcons: Record<StatusVariant, string> = {
  draft: "bg-secondary-foreground/20",
  pending: "bg-amber-500",
  approved: "bg-emerald-500",
  rejected: "bg-rose-500",
  completed: "bg-blue-500"
}

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: StatusVariant
}

const StatusBadge = ({
  variant,
  className,
  children,
  ...props
}: StatusBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className={cn("mr-1 h-1.5 w-1.5 rounded-full", variantIcons[variant])} />
      {children || variant.charAt(0).toUpperCase() + variant.slice(1)}
    </div>
  )
}

export { StatusBadge }
