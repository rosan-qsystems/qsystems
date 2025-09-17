import { Navigate, Route, Routes } from "react-router";
import { AuthLayout } from "../layouts/Auth.layout";
import { DashboardLayout } from "../layouts/dashboard/Dashboard.layout.tsx";
import { useAuthStore } from "../store/modules/auth/auth.store.ts";

export const MainRoutes = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn || !!state.token?.access_token);
  // const user = useSelector((state: any) => state.authReducer.user);
  // const setDefaultPath = isLoggedIn ? "/" : "/auth";
  return (
    <Routes>
      <Route
        path={"/auth/*"}
        element={!isLoggedIn ? <AuthLayout /> : <Navigate to={"/"} />}
      />
      <Route
        path={"/*"}
        element={isLoggedIn ? <DashboardLayout /> : <Navigate to={"/auth"} />}
      />
    </Routes>
  );
};
