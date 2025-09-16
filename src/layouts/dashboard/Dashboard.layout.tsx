import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { HeaderDashboard } from "../../components/modules/dashboard/partials/Header.dashboard.tsx";
import { DashLayout } from "../../routes/dashboard/Dashboard.route.tsx";

export const DashboardLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShell.Header style={{ height: 60 }}>
        <HeaderDashboard>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </HeaderDashboard>
      </AppShell.Header>
      <AppShell.Main>
        <DashLayout />
      </AppShell.Main>
    </AppShell>
  );
};
