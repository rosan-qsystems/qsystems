import {Grid} from "@mantine/core"
import {Route, Routes} from "react-router"
import {AuthRoutes} from "../routes/auth/Auth.routes.tsx";

export const AuthLayout = () => {
    return <Grid>
        <Grid.Col span={12}>
            <Routes>
                {AuthRoutes.map((v, key) => <Route
                    path={v.path}
                    element={v.component}
                    key={key}
                    index={true}
                />)
                }
            </Routes>
        </Grid.Col>
    </Grid>
}