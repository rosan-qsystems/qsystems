import {Settings, User, UserCog } from "lucide-react";


export const MENU_ITEMS: Array<{
    key: string;
    label: string;
    path: string;
    icon: React.ReactElement;
}> = [
    {
        key: 'profile',
        label: 'Profile',
        path: '/',
        icon: <User size={16} />,
    },
    {
        key: 'user-settings',
        label: 'User Settings',
        path: '/ Settings',
        icon: <UserCog size={16} />,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: '/',
        icon: <Settings size={16} />,
    },
];