
import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  subheading?: string
  actions?: React.ReactNode
}

const PageHeader = ({
  heading,
  subheading,
  actions,
  className,
  ...props
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight animate-slide-in-bottom [animation-delay:100ms]">
          {heading}
        </h1>
        {subheading && (
          <p className="text-muted-foreground animate-slide-in-bottom [animation-delay:200ms]">
            {subheading}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 animate-slide-in-bottom [animation-delay:300ms]">
          {actions}
        </div>
      )}
    </div>
  )
}

export { PageHeader }
