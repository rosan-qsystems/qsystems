import { Avatar, Divider, Menu } from "@mantine/core";
import { LogOut } from "lucide-react";
import { memo, useCallback } from "react";
import {MENU_ITEMS} from "../../utils/helper/header.helper.tsx";
import {useNavigate} from "react-router";
import {useAuthStore} from "../../store/modules/auth/auth.store.ts";



export const UserMenu = memo(() => {

    const user = useAuthStore(state=> state.user);
    const logout = useAuthStore(state=> state.logout);
    const username = user?.first_name + ' ' + user?.last_name;
    const navigate = useNavigate();
    const handleMenuClick = useCallback((path:string) => {
        navigate(path);
    }, []);

    const handleLogout = useCallback(() => {
        logout();
        handleMenuClick('/');
    }, [handleMenuClick]);

    return (
        <Menu position="bottom-end" shadow="md" width={200}>
            <Menu.Target>
                <Avatar
                    style={{ cursor: 'pointer' }}
                    alt={username}
                    title={username}
                    className="hover:opacity-80 transition-opacity"
                >
                    {username.slice(0,2)}
                </Avatar>
            </Menu.Target>

            <Menu.Dropdown>
                {MENU_ITEMS.map((item) => (
                    <Menu.Item
                        key={item.key}
                        leftSection={item.icon}
                        onClick={()=>handleMenuClick(item.path)}
                        className="hover:bg-gray-50"
                    >
                        {item.label}
                    </Menu.Item>
                ))}

                <Divider my="xs" />

                <Menu.Item
                    leftSection={<LogOut size={16} />}
                    onClick={handleLogout}
                    className="hover:bg-red-50 hover:text-red-600"
                    color="red"
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
});

UserMenu.displayName = 'UserMenu';