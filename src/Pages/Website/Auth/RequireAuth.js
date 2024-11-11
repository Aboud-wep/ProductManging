import { useContext } from "react";
import { User } from "../../../Context/Context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const user = useContext(User);
  const location = useLocation();
  return user.auth.details ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
