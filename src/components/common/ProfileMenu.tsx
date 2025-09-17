import { Avatar, Menu, Switch, Divider, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import {useNavigate} from "react-router";

export const ProfileMenu = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate= useNavigate();
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Avatar ml="xs" color={"primary"} variant={"filled"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} to="/profile">
          My Profile
        </Menu.Item>
        <Menu.Item component={Link} to="/settings">
          Settings
        </Menu.Item>
        <div style={{ padding: "6px 12px" }}>
          <Group justify="space-between">
            <span>Dark mode</span>
            <Switch
              size="sm"
              onLabel={<SunIcon size={12} />}
              offLabel={<MoonIcon size={12} />}
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              onClick={(e) => e.stopPropagation()}
            />
          </Group>
        </div>
        <Divider />
        <Menu.Item onClick={() => navigate('/auth')}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
