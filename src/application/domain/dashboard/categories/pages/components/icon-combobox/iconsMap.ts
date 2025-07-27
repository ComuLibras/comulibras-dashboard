import { icons } from "lucide-react";

export const iconsMap = 
  Object.entries(icons).map(([key, value]) => ({
    label: key,
    value: value,
  }));