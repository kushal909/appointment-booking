// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function ProtectedRoute({ allowedRole, children }) {

//     console.log("allowedRole",allowedRole)
//     console.log("children",children)

//   const {
//     user,
//     isAuthenticated
//   } = useSelector(
//     (state) => state.auth
//   );

//   // Not logged in

//   console.log("isuthenticated",isAuthenticated)
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Wrong role
//   if (user?.role !== allowedRole) {
//     return <Navigate to="/" replace />;
//   }

//   // Correct role
//   return children;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { getToken, getUser } from "../utils/authStorage";

function ProtectedRoute({ allowedRole, children }) {

  const token = getToken();
  const user = getUser();

  console.log("token:", token);
  console.log("user:", user);
  console.log("allowedRole:", allowedRole);

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // Correct role
  return children;
}

export default ProtectedRoute;