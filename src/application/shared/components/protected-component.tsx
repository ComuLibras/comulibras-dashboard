import { useMe } from "@/application/domain/dashboard/accounts/hooks/use-me";
import type { Roles } from "@/application/domain/dashboard/accounts/services/dto/account-dto";

type Props = {
  allowedRoles: Roles[];
  children: React.ReactNode;
}

export function ProtectedComponent({ allowedRoles, children }: Props) {
  const { profile } = useMe();

  if (!profile?.role) {
    return null;
  }

  if (!allowedRoles.includes(profile.role)) {
    return null;
  }

  return children;
}