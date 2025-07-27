import { Icon, type IconProps } from "@/application/shared/components/ui/icon";

interface Props {
  icon: IconProps['name'];
}

export function IconItem({ icon }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} className="size-4"/>
      <strong className="text-sm font-medium">
        {icon}
      </strong>
    </div>
  )
}