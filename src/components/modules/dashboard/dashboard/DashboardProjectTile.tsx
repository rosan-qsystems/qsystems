import {Grid, Progress} from "@mantine/core";
import {Calendar1Icon, Dot} from "lucide-react";

export const DashboardProjectTile = () => {
    const data = [
        {label: 'Todo', value: 3, color: 'red'},
        {label: 'In Progress', value: 3, color: 'red'},
        {label: 'Review', value: 3, color: 'red'},
    ]
    return <div className={'p-sm bg-gray-100 rounded-md'}>
        <div className={'flex'}>
            <div className="text-md flex-grow">Interact with sub tasks easily</div>
        </div>
        <div className="my-xs">
            <Progress value={80}/>
        </div>
        <div>
            <Grid>
                {data.map((item: any, key: number) => (<Grid.Col span={{base: 4, sm: 3, xs: 12, md: 4}} key={key}>
                    <div className="flex items-center">
                        <Dot color={item.color}></Dot>
                        <div className="flex gap-xs">
                            <div>
                                {item.value}
                            </div>
                            <div>
                                {item.label}
                            </div>
                        </div>
                    </div>
                </Grid.Col>))}
            </Grid>
        </div>
    </div>
}