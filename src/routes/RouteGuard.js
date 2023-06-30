import { Navigate } from "react-router-dom";

const RouteGuard = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RouteGuard;
