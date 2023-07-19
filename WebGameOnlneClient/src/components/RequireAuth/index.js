import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequiredAuth() {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("token")
  );
  const location = useLocation();

  return hasToken && hasToken !== "" && hasToken !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace />
  );
}

export default RequiredAuth;