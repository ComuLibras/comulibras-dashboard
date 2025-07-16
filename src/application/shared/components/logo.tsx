import type { ClassValue } from "clsx";
import { cn } from "../lib/utils";

import ComulibrasLogo from '@/application/assets/logo.png';
import ComulibrasLogoLight from '@/application/assets/logo-light.png';
import { useTheme } from "./theme/use-theme";

interface Props {
  className?: ClassValue[]
}

export function Logo({ className }: Props) {
  const { theme } = useTheme();

  return (
    <img src={theme === 'dark' ? ComulibrasLogoLight : ComulibrasLogo} alt="Logo" className={cn(className)} />
  )
}