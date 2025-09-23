import {DashboardStats} from "../../../components/modules/dashboard/dashboard/Dashboard.stats.tsx";
import {ActivitiesList} from "../../../components/modules/dashboard/dashboard/ActivitiesList.tsx";
import {ProjectOverview} from "../../../components/modules/dashboard/dashboard/ProjectOverview.tsx";
import {ActiveProjects} from "../../../components/modules/dashboard/dashboard/ActiveProjects.tsx";
import {DashboardCalendar} from "../../../components/modules/dashboard/dashboard/DashboardCalendar.tsx";
import {Grid, Card} from '@mantine/core';
import {TasksStatus} from "../../../components/modules/dashboard/dashboard/TasksStatus.tsx";

export const DashboardPage = () => {
    return (
        <main>
            <div className={'text-center mb-lg mt-lg'}>
                <div className="text-4xl font-bold">Hi, Jane Doe</div>
                <div className="text-2xl">What are your plans for Today ?</div>
                <div className="text-lg">This platform is designed to revolutionize the way you organize and access your
                    projects.
                </div>
            </div>
            <DashboardStats/>
            <Grid>
                <Grid.Col span={"content"}>
                    <Card withBorder className={'h-full'}>
                        <DashboardCalendar/>
                    </Card>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Card withBorder className={'h-full'}>
                        <ProjectOverview/>
                    </Card>
                </Grid.Col>
                <Grid.Col span={'auto'}>
                    <Card withBorder className={'h-full'}>
                        <ActivitiesList/>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card withBorder className={'h-full'}>
                        <TasksStatus/>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card withBorder>
                        <ActiveProjects/>
                    </Card>
                </Grid.Col>
            </Grid>
        </main>
    );
};
