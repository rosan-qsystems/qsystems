import {Divider, Stack, Text} from "@mantine/core";
import {DASHBOARD_NAV_ITEMS, type NavItemType} from "../../../../routes/dashboard/Dashboard.nav-items.tsx";
import {memo, useMemo} from "react";
import {Logo} from "../../../common/Logo.tsx";
import { useNavigate } from "react-router";


const NavItem = memo((item: NavItemType) => {
    const {icon, label, path} = item;
    const navigate = useNavigate();
    return <div
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
        onClick={()=>navigate(path)}
    > 
        {icon}
        <span>{label}</span>
    </div>
})

export const SidebarDashboard = () => {
    const navGroup = useMemo(() => DASHBOARD_NAV_ITEMS.map((navGroupItems, key) => (
        <div key={key}>
            <Text c="dimmed">{navGroupItems.group}</Text>
            {
                navGroupItems.items.map((navItem,) => <NavItem icon={navItem.icon} label={navItem.label} path={navItem.path}/>)
            }
            {(key !== DASHBOARD_NAV_ITEMS.length - 1) && <Divider my="sm"/>}
        </div>
    )), []);

    return (
        <>
            <Logo/>
            <Stack className="mt-2">
                {navGroup}
            </Stack>
        </>
    );
}