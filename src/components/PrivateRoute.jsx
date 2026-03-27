import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser, setCredentials } from "../store/slices/authSlice";
import { useGetProfileQuery } from "../store/services/AuthServices";

const hasValidUser = (user) => Boolean(user?.uuid || user?.id || user?.email);

function PrivateRoute() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, isError } = useGetProfileQuery(undefined, {
    skip: hasValidUser(user),
  });

  useEffect(() => {
    const profileUser = data?.user ?? data?.data?.user ?? data;
    if (hasValidUser(profileUser)) {
      dispatch(setCredentials({ user: profileUser }));
    }
  }, [data, dispatch]);

  const profileUser = data?.user ?? data?.data?.user ?? data;
  if (hasValidUser(user) || hasValidUser(profileUser)) {
    return <Outlet />;
  }

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
