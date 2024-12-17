import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { TUserPayload } from "@/types";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;

  const role = user?.user?.role;

  // If user is not admin, redirect to login
  if (role !== "admin") {
    return <Navigate to="/login" replace={true} />;
  }

  // If token exists and user is admin, render the children components
  return <>{children}</>;
};

export default AdminProtectedRoute;
