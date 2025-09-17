import { Grid } from "@mantine/core";
import { Route, Routes } from "react-router";
import { DASHBOARD_NAV_ITEMS } from "./Dashboard.nav-items.tsx";
import { SettingsLayout } from "../../layouts/dashboard/Settings.layout.tsx";
import { ProjectLayout } from "../../layouts/dashboard/Project.layout.tsx";

export const DashLayout = () => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Routes>
          {DASHBOARD_NAV_ITEMS.map((item, itemIdx) => {
            const Component = item.component;
            return (
              <Route
                key={itemIdx}
                path={item.path}
                index={true}
                element={Component ? <Component /> : null}
              />
            );
          })}
          <Route path={"/settings/*"} element={<SettingsLayout />} />
          <Route path={"/projects/*"} element={<ProjectLayout />} />
        </Routes>
      </Grid.Col>
    </Grid>
  );
};
