import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequiredAuth() {
  const [hasToken, setHasToken] = useState(localStorage.getItem("accessToken"));

  return hasToken && hasToken !== "" && hasToken !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RequiredAuth;
