import {DashboardProjectTile} from "./DashboardProjectTile.tsx";

export const ActiveProjects = () => {
    return <div>
        <div className="text-xl">Your Tasks</div>
        <div className={'space-y-xs mt-sm'}>
            <DashboardProjectTile/>
            <DashboardProjectTile/>
            <DashboardProjectTile/>
            <DashboardProjectTile/>
        </div>
    </div>
}