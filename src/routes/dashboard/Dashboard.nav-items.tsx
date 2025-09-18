import {
  Bell,
  ClipboardList,
  Columns4,
  FolderKanban,
  HandHelping,
  LayoutDashboard,
  MessageCircleCode,
  NotepadText,
  Settings,
  SquareChartGantt,
  SquareDashedKanban,
  User,
} from "lucide-react";
import type { ReactElement } from "react";
import { DashboardPage } from "../../pages/dashboard/dashboard/Dashboard.page";
import { ProjectPage } from "../../pages/dashboard/project/Project.page";
import { EpicPage } from "../../pages/dashboard/epic/Epic.page";
import { BoardPage } from "../../pages/dashboard/board/Board.page";

export type DashboardNavType = {
  group: string;
  items: NavItemType[];
};

export type NavItemType = {
  label: string;
  icon?: ReactElement;
  path: string;
  type: "DEFAULT" | 'DROPDOWN',
  items?: any;
  component: any;
};

export const NAV_ITEMS: NavItemType[] = [
  {
    label: "Dashboard",
    path: "/",
    type: "DEFAULT",
  },
  {
    type: "DROPDOWN",
    path:'/projects',
    label: 'Projects',
    items: [],
  },
  {
    label: "JIRA",
    path: "/jira",
    type: "DEFAULT",
  },
  {
    label: "Smart Scans",
    path: "/smart-scan",
    type: "DEFAULT",
  },
];

export const  DASHBOARD_NAV_ITEMS = [
      {
        label: "Dashboard",
        icon: <LayoutDashboard />,
        component: DashboardPage,
        path: "/",
      },
      {
        label: "Project",
        icon: <FolderKanban />,
        component: ProjectPage,
        path: "/project",
      },
       {
        label: "Epic",
        icon: <NotepadText />,
        component: EpicPage,
        path: "/epic",
      },
       {
        label: "Board",
        icon: <SquareDashedKanban />,
        component: BoardPage,
        path: "/board",
      },
      {
        label: "Timeline",
        icon: <SquareChartGantt />,
        component: DashboardPage,
        path: "/dashboard",
      },
      {
        label: "My Tasks",
        icon: <ClipboardList />,
        component: DashboardPage,
        path: "/dashboard",
      },
      {
        label: "Report",
        icon: <Columns4 />,
        component: DashboardPage,
        path: "/dashboard",
      },
      {
        label: "User",
        icon: <User />,
        component: DashboardPage,
        path: "/dashboard",
      },
      {
        label: "Chat",
        icon: <MessageCircleCode />,
        component: DashboardPage,
        path: "/dashboard",
      },
      {
        label: "Notifications",
        icon: <Bell />,
        path: "/dashboard",
      },
      {
        label: "Setting",
        icon: <Settings />,
        component: DashboardPage,
        path: "/dashboard",
      },
      {
        label: "Help",
        icon: <HandHelping />,
        component: DashboardPage,
        path: "/dashboard",
      },
];
