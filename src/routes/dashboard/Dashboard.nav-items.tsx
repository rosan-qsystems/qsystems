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
import { SmartScanPage } from "../../pages/dashboard/smart-scan/SmartScan.page.tsx";
import { JiraPage } from "../../pages/dashboard/jira/Jira.page.tsx";

export type NavItemType = {
  label: string;
  icon?: ReactElement;
  path: string;
  type: "DEFAULT" | 'DROPDOWN',
  items?: any;
};

export const NAV_ITEMS: NavItemType[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    type: "DEFAULT",
  },
  {
    type: "DROPDOWN",
    path: "/projects",
    label: "Projects",
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

export const DASHBOARD_NAV_ITEMS: NavItemType[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    component: DashboardPage,
  },
  {
    label: "Project",
    icon: <FolderKanban />,
    component: ProjectPage,
  },
  {
    label: "Epic",
    icon: <NotepadText />,
    component: EpicPage,
  },
  {
    label: "Board",
    icon: <SquareDashedKanban />,
    component: BoardPage,
  },
  {
    label: "Timeline",
    icon: <SquareChartGantt />,
    component: DashboardPage,
  },
  {
    label: "My Tasks",
    icon: <ClipboardList />,
    component: DashboardPage,
  },
  {
    label: "Report",
    icon: <Columns4 />,
    component: DashboardPage,
  },
  {
    label: "User",
    icon: <User />,
    component: DashboardPage,
  },
  {
    label: "Chat",
    icon: <MessageCircleCode />,
    component: DashboardPage,
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
  {
    label: "Jira",
    icon: <HandHelping />,
    component: JiraPage,
    path: "/jira",
  },
  {
    label: "Smart Scan",
    icon: <HandHelping />,
    component: SmartScanPage,
    path: "/smart-scan",
  },
];
