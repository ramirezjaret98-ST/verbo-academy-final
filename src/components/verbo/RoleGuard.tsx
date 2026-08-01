import { Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import type { Role } from "@/lib/mock-data";
import type { ReactNode } from "react";
import { SessionExpiredScreen, FrozenAccountScreen, isAccountFrozen } from "@/components/verbo/error-screens";

export function RoleGuard({ allow, children }: { allow: Role; children: ReactNode }) {
  const { user, ready } = useAuth();
  // Wait for the stored session to be restored before judging the session.
  if (!ready) return null;
  // No valid session: surface the timeout screen instead of a silent redirect.
  if (!user) return <SessionExpiredScreen />;
  if (user.role !== allow) {
    const dest = user.role === "admin" ? "/admin" : user.role === "teacher" ? "/teacher" : "/student";
    return <Navigate to={dest} />;
  }
  // Manual freeze flag set by Admin — applies to all three roles.
  if (isAccountFrozen(user)) return <FrozenAccountScreen />;
  return <>{children}</>;
}
