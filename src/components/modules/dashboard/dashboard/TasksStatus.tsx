import {DashboardTaskTile} from "./DashboardTaskTile.tsx";

export const TasksStatus = () => {
    return <div>
        <div className="text-lg">Your Tasks</div>
        <div className={'space-y-xs mt-sm'}>
            <DashboardTaskTile/>
            <DashboardTaskTile/>
            <DashboardTaskTile/>
        </div>
    </div>
}