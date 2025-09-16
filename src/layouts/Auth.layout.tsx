import { Grid } from "@mantine/core";
import { Route, Routes } from "react-router";
import { AuthRoutes } from "../routes/auth/Auth.routes.tsx";
import { AuthCarousel } from "../pages/auth/AuthCarousel.tsx";

export const AuthLayout = () => {
  return (
    <Grid>
      <Grid.Col span={7} p={"xl"}>
        <div
          className={
            "carousel-container h-full max-h-full w-full rounded-md border border-gray-400"
          }
        >
          <AuthCarousel />
        </div>
      </Grid.Col>
      <Grid.Col span={5}>
        <Routes>
          {AuthRoutes.map((v, key) => (
            <Route path={v.path} element={v.component} key={key} index={true} />
          ))}
        </Routes>
      </Grid.Col>
    </Grid>
  );
};
