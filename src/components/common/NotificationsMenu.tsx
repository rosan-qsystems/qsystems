import {ActionIcon, Card, Menu} from "@mantine/core"
import {Bell} from "lucide-react";

export const NotificationsMenu = ()=>{
    return <Menu position={'bottom-end'}>
        <Menu.Target>
            <ActionIcon variant={'subtle'}>
                <Bell/>
            </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
            <Card className={'min-h-[200px] min-w-[200px]'}>something random</Card>
        </Menu.Dropdown>
    </Menu>
}