import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderDashboard } from "../components/modules/dashboard/partials/Header.dashboard.tsx";
import { SidebarDashboard } from "../components/modules/dashboard/partials/Sidebar.dashboard.tsx";
// import { MainDashboard } from "../components/modules/dashboard/partials/Main.dashboard.tsx";
import { DashLayout } from "../routes/dashboard/Dashboard.route.tsx";

export const DashboardLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 80 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header style={{ height: 60 }}>
        <HeaderDashboard>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </HeaderDashboard>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SidebarDashboard />
      </AppShell.Navbar>
      <AppShell.Main>
        {/* <MainDashboard /> */}
        <DashLayout />
      </AppShell.Main>
    </AppShell>
  );
};
