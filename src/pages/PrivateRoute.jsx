import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuth } = useSelector((state) => state.user);

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}
