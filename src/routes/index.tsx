import { Route, Routes } from "react-router";
import { AuthLayout } from "../layouts/Auth.layout";
import { DashboardLayout } from "../layouts/dashboard/Dashboard.layout.tsx";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path={"/auth/*"} element={<AuthLayout />} />
      <Route path={"/*"} element={<DashboardLayout />} />
    </Routes>
  );
};
