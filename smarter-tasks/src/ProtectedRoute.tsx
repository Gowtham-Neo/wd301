import { Navigate } from "react-router-dom";
const authToken = localStorage.getItem('authToken');

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const authenticated = !! authToken
  if (authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
 }
}