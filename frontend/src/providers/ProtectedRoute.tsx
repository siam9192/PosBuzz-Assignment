import LoadingPage from "../pages/LoadingPage";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useLoadingBouncer from "../lib/useLoadingBouncer";
import { useCurrentUser } from "../lib/useCurrentUser";

interface Props {
  children: ReactNode;
  access: "guest" | "auth";
}

function ProtectedRoute({ children, access }: Props) {
  const { user, isLoading } = useCurrentUser();

  const bouncedLoading = useLoadingBouncer(isLoading, 1000);

  // Display loading page during user loading
  if (bouncedLoading) return <LoadingPage />;

  if (access === "auth") {
    if (user) return children;
    else return <Navigate to={"/login"} />;
  }

  if (!user) return children;
  return <Navigate to={"/"} />;
}

export default ProtectedRoute;
