import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../slices/auth";

const RequireAuth = () => {
    const user = useSelector(selectCurrentUser);
    const location = useLocation();

    return (
        user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />

    )
}

export default RequireAuth;