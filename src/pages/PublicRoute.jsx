import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { isAuth } = useSelector((state) => state.user);

  return !isAuth ? children : <Navigate to="/dashboard" />;
}
