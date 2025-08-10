
import { makeAuthService } from "@/application/domain/auth/services/make-auth-service";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const authService = makeAuthService();
  const { accessToken } = authService.getToken();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
