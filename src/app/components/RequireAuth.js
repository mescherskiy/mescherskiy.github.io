import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../slices/authSlice";

const RequireAuth = () => {
    const user = useSelector(selectCurrentUser);
    const location = useLocation();

    let content = user
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />

    return content
}

export default RequireAuth;