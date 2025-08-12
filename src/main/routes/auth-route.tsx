
import { useMe } from "@/application/domain/dashboard/accounts/hooks/use-me";
import { Navigate, Outlet } from "react-router";

export function AuthRoute() {
  const { profile } = useMe();

  if (profile) {
    return <Navigate to="/dashboard/categories" replace />;
  }

  return <Outlet />;
}
