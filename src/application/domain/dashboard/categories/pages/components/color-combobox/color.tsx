import { Icon } from "@/application/shared/components/ui/icon";
import { colorsMap, type Colors } from "./colorsMap";

interface Props {
  color: Colors;
  hideHex?: boolean;
}

export function Color({ color, hideHex = false }: Props) {
  const label = colorsMap[color];

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="size-6 rounded flex items-center justify-center" style={{ backgroundColor: `${label.hex}1a`, }}>
          <Icon name={label.icon} className="size-4" color={label.hex} />
        </div>
        <strong className="text-sm font-medium">
          {label.name}
        </strong>
      </div>

      {!hideHex && (
        <div className="flex items-center">
          <span className="flex text-xs text-muted-foreground">{label.hex}</span>
        </div>
      )}

    </div>
  )
}