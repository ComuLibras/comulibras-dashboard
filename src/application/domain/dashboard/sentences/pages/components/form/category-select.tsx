import type { Category } from "@/application/domain/dashboard/categories/services/dto/categories-dto";
import { Icon } from "@/application/shared/components/ui/icon";
import { cn } from "@/application/shared/lib/utils";

type Props = {
  category: Category;
  size?: "sm" | "md" | "lg";
}

export function CategorySelect({ category, size = "sm" }: Props) {
  const sizes = {
    sm: {
      div: "size-6",
      icon: "size-3",
    },
    md: {
      div: "size-8",
      icon: "size-4",
    },
    lg: {
      div: "size-10",
      icon: "size-6",
    },
  }

  return (
    <div className="flex items-center gap-2">
      <div 
        className={cn("flex items-center justify-center rounded", sizes[size].div)}
        style={{ backgroundColor: `${category.color}2a` }}
      >
        <Icon name={category.icon} className={cn("text-white", sizes[size].icon)} color={category.color} />
      </div>
      <span>{category.name}</span>
    </div>
  )
}