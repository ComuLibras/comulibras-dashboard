import * as React from "react"

import { cn } from "@/application/shared/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Input({ className, type, leftIcon, rightIcon, ...props }: InputProps) {
  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-4 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-12 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          leftIcon && "pl-8",
          rightIcon && "pr-8",
          className
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {rightIcon}
        </div>
      )}
    </div>
  )
}

export { Input }
