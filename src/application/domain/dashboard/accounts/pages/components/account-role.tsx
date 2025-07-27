import { Icon, type IconProps } from "@/application/shared/components/ui/icon";
import { Roles } from "../../services/dto/account-dto";

type RoleIcon = IconProps['name'];
type RoleLabel = string;
type Role = {
  label: RoleLabel;
  icon: RoleIcon;
}

const map: Record<Roles, Role> = {
  [Roles.ADMIN]: {
    label: "Administrador Geral",
    icon: "users-round",
  },
  [Roles.MANAGER]: {
    label: "Administrador de frases",
    icon: "list-video",
  },
  [Roles.USER]: {
    label: "Usuário",
    icon: "user",
  },
}

interface Props {
  role: Roles;
}

export function AccountRole({ role }: Props) {
  console.log(role)
  const mappedRole = map?.[role];

  if (!mappedRole) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Icon name={mappedRole.icon} className="size-4" />
      {mappedRole.label}
    </div>
  )
}