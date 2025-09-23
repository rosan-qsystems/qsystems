import {DashboardProjectTile} from "./DashboardProjectTile.tsx";
import {Link} from "react-router";

export const ActiveProjects = () => {
    return <div>
        <div className="flex justify-between">
            <div className="text-lg">Your Projects</div>
            <div>
                <Link to={'/projects'}>View all</Link>
            </div>
        </div>
        <div className={'space-y-xs mt-sm'}>
            <DashboardProjectTile/>
            <DashboardProjectTile/>
            <DashboardProjectTile/>
            <DashboardProjectTile/>
        </div>
    </div>
}