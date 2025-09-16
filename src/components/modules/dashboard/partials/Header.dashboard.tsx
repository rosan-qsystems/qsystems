import { Group, Button } from "@mantine/core";
import { NotificationsMenu } from "../../../common/NotificationsMenu.tsx";
import { UserMenu } from "../../../common/UserMenu.tsx";
import { Logo } from "../../../common/Logo.tsx";
import { NavItemsDashboard } from "./NavItems.dashboard.tsx";

export const HeaderDashboard = (props: { children: any }) => {
  return (
    <div className={"h-full flex items-center gap-lg p-md"}>
      <Logo />
      {props.children}
      <div className="flex justify-between items-center w-full">
        <NavItemsDashboard />

        <Group align={"center"} className="flex ml-auto gap-4 mr-sm">
          <Button variant={"outline"}>Create</Button>
          <NotificationsMenu />
          <UserMenu />
        </Group>
      </div>
    </div>
  );
};
