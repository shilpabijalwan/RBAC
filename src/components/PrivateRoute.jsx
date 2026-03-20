import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../store/slices/authSlice";
function PrivateRoute() {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  if (user?.uuid) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default PrivateRoute;
