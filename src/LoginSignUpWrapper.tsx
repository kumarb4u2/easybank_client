import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { isAuthSelector } from "./store/slices/authSlice";

const LoginSignUpWrapper = ({ children }: { children: any }) => {
  const isAuthenticated: boolean = useAppSelector(isAuthSelector);
  const location = useLocation();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return children;
};

export default LoginSignUpWrapper;
