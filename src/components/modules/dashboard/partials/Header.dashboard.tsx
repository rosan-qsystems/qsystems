import { Group, Input } from "@mantine/core";
import { Search } from "lucide-react";
import { NotificationsMenu } from "../../../common/NotificationsMenu.tsx";
import { UserMenu } from "../../../common/UserMenu.tsx";
import { Logo } from "../../../common/Logo.tsx";

export const HeaderDashboard = (props: { children: any }) => {
  return (
    <div className={"h-full flex items-center"}>
      <Logo />
      {props.children}
      <div className="flex justify-between items-center w-full">
        <Input
          placeholder="Search"
          variant="unstyled"
          leftSection={<Search size={20} />}
        />
        <Group align={"center"} className="flex ml-auto gap-4 mr-sm">
          <NotificationsMenu />
          <UserMenu />
        </Group>
      </div>
    </div>
  );
};
