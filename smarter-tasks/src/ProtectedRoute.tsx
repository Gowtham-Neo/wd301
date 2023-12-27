import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const authenticated = localStorage.getItem("authenticated");
  if (authenticated === 'true') {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
 }
}