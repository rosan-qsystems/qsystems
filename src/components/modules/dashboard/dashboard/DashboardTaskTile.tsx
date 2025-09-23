import {Avatar, Badge} from "@mantine/core";
import {Calendar1Icon} from "lucide-react";

export const DashboardTaskTile = ()=>{
    return <div className={'p-sm bg-gray-100 rounded-md'}>
        <div className={'flex'}>
            <div className="text-md flex-grow">Interact with sub tasks easily</div>
            <div><Badge color={'red'} variant={'light'}>In Progress</Badge></div>
        </div>
        <div className={''}>
            <div className={'flex justify-between'}>
                <div className="due-date flex gap-xs"><Calendar1Icon size={20}/><div>Due: Sep 25, 2025</div></div>
                <div className={'flex items-center gap-xs'}><div>Assigned To:</div> <Avatar/></div>
            </div>
        </div>
    </div>
}