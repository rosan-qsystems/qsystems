import {
  ActionIcon,
  Button,
  Card,
  Menu,
  Select,
  Stack,
  Text,
  Group,
  Indicator,
  Chip,
  Alert,
} from "@mantine/core";
import { Ellipsis } from "lucide-react";

export const DashboardPage = () => {
  return (
    <>
      <Stack
        h={320}
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="space-between"
        gap="md"
      >
        <Group>
          <Alert
            variant="light"
            color="blue"
            title="Conceptualization and Theme"
            className="w-96"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
            officiis, quae tempore necessitatibus placeat saepe.
          </Alert>
          <Alert
            variant="light"
            color="blue"
            title="Conceptualization and Theme"
            className="w-96"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
            officiis, quae tempore necessitatibus placeat saepe.
          </Alert>
          <Alert
            variant="light"
            color="blue"
            title="Conceptualization and Theme"
            className="w-96"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
            officiis, quae tempore necessitatibus placeat saepe.
          </Alert>
        </Group>
        <div className="flex gap-4">
          <div>
            <Button variant="filled" color="rgba(8, 7, 7, 1)">
              New Task
            </Button>
          </div>
          <div className="w-32">
            <Select
              width={20}
              size="sm"
              placeholder="Sort By"
              data={["React", "Angular", "Vue", "Svelte"]}
            />
          </div>
          <div className="w-32">
            <Select
              width={20}
              size="sm"
              placeholder="Filter"
              data={["React", "Angular", "Vue", "Svelte"]}
            />
          </div>
        </div>
      </Stack>
      <div className="flex gap-4">
        <Card withBorder shadow="sm" radius="md" className="w-60 h-80 mt-lg">
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <div className="flex items-center gap-2">
                <Indicator color="green"></Indicator>
                <Text fw={500}>To-Do</Text>
              </div>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <Ellipsis size={16} />
                  </ActionIcon>
                </Menu.Target>
              </Menu>
            </Group>
          </Card.Section>
          <div className="flex items-center gap-2 mt-sm">
            <Chip color="yellow" variant="light">
              Product
            </Chip>
            <Chip color="violet" variant="light">
              Improve
            </Chip>
          </div>

          <Text mt="sm" c="dimmed" size="sm">
            since last visit, review them to select which one should be added to
            your gallery
          </Text>
        </Card>
        <Card withBorder shadow="sm" radius="md" className="w-60 h-80 mt-lg">
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <div className="flex items-center gap-2">
                <Indicator color="yellow"></Indicator>
                <Text fw={500}>On Going</Text>
              </div>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <Ellipsis size={16} />
                  </ActionIcon>
                </Menu.Target>
              </Menu>
            </Group>
          </Card.Section>
          <div className="flex itemse-center gap-2 mt-sm">
            <Chip variant="light">Website</Chip>
            <Chip color="violet" variant="light">
              UX
            </Chip>
          </div>

          <Text mt="sm" c="dimmed" size="sm">
            since last visit, review them to select which one should be added to
            your gallery
          </Text>
        </Card>
        <Card withBorder shadow="sm" radius="md" className="w-60 h-80 mt-lg">
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <div className="flex items-center gap-2">
                <Text fw={500}>In Review</Text>
              </div>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <Ellipsis size={16} />
                  </ActionIcon>
                </Menu.Target>
              </Menu>
            </Group>
          </Card.Section>

          <Text mt="sm" c="dimmed" size="sm">
            since last visit, review them to select which one should be added to
            your gallery
          </Text>
        </Card>
        <Card withBorder shadow="sm" radius="md" className="w-60 h-80 mt-lg">
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <div className="flex items-center gap-2">
                <Indicator color="gray"></Indicator>
                <Text fw={500}>Revision</Text>
              </div>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <Ellipsis size={16} />
                  </ActionIcon>
                </Menu.Target>
              </Menu>
            </Group>
          </Card.Section>
          <div className="flex itemse-center gap-2 mt-sm">
            <Chip color="indigo" variant="light">
              Website
            </Chip>
            <Chip color="yellow" variant="light">
              Design
            </Chip>
          </div>

          <Text mt="sm" c="dimmed" size="sm">
            since last visit, review them to select which one should be added to
            your gallery
          </Text>
        </Card>
        <Card withBorder shadow="sm" radius="md" className="w-60 h-80 mt-lg">
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <div className="flex items-center gap-2">
                <Indicator></Indicator>
                <Text fw={500}>Done</Text>
              </div>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <Ellipsis size={16} />
                  </ActionIcon>
                </Menu.Target>
              </Menu>
            </Group>
          </Card.Section>

          <Text mt="sm" c="dimmed" size="sm">
            since last visit, review them to select which one should be added to
            your gallery
          </Text>
        </Card>
      </div>
    </>
  );
};
