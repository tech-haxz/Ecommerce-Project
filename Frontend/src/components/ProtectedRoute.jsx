import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { accessToken, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return accessToken ? children : <Navigate to="/login" />;
}
