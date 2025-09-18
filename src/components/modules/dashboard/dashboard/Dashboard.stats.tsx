import {useMemo} from "react";
import {ChartBarStacked} from "lucide-react";
import {Avatar, Card, Grid, Text} from "@mantine/core";

export const DashboardStats = ()=>{
    const stats = useMemo(()=>([
        {
            label: 'Total Projects',
            icon: <ChartBarStacked/>,
            value: 100,
            color: 'purple'
        },
        {
            label: 'Tasks Completed',
            icon: <ChartBarStacked/>,
            value: 100,
            color: 'green'
        },
        {
            label: 'Tasks in Progress',
            icon: <ChartBarStacked/>,
            value: 100,
            color: 'blue',
        },
        {
            label: 'Pending Tasks',
            icon: <ChartBarStacked/>,
            value: 100,
            color: 'orange'
        },
    ]),[]);

    const kpiCards = useMemo(()=>{
        return stats.map((stat, key) => (
            <Grid.Col key={key} span={{base: 4, sm: 6, xs:12, md: 3, xl:3}}>
                <Card withBorder>
                    <div className="flex gap-sm">
                        <div>
                            <Avatar color={stat.color} radius={'md'} size={'lg'}>
                                {stat.icon}
                            </Avatar>
                        </div>
                        <div className={'flex-grow'}>
                            <div className="font-bold">{stat.label}</div>
                            <div className="text-lg">{stat.value}</div>
                        </div>
                    </div>
                </Card>
            </Grid.Col>
        ))
    },[stats])
    return <Grid>
        {kpiCards}
    </Grid>
}