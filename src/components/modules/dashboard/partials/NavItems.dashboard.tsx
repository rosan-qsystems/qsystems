import { Menu, Button } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { NAV_ITEMS } from "../../../../routes/dashboard/Dashboard.nav-items.tsx";

export const NavItemsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const renderNavItem = (item, index) => {
    if (item.type === "DROPDOWN") {
      return (
        <Menu key={index} trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <Button
              variant="subtle"
              color={"dark"}
              component={NavLink}
              path={item.path}
              rightSection={<ChevronDown size={16} />}
              className={"active"}
            >
              {item.label}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            {projects?.length > 0 ? (
              projects.map((menuItem, menuIndex) => (
                <Menu.Item
                  key={menuIndex}
                  component={NavLink}
                  to={menuItem.path || menuItem.href}
                >
                  {menuItem.label}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item disabled>No items available</Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Button
        key={index}
        component={NavLink}
        to={item.path}
        variant="subtle"
        color={"dark"}
        className={"active"}
      >
        {item.label}
      </Button>
    );
  };

  return (
    <div className="flex items-center gap-2 rounded-md p-[2px] bg-gray-100">
      {NAV_ITEMS.map(renderNavItem)}
    </div>
  );
};
