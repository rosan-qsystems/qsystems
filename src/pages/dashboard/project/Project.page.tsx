import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  Group,
  Indicator,
  Menu,
  Modal,
  Progress,
  RingProgress,
  Select,
  Tabs,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Ellipsis,
  Lightbulb,
  ListChecks,
  MoreVertical,
  Plus,
} from "lucide-react";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import { PROJECT_ITEMS } from "../../../utils/helper/project.helper";

export const ProjectPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Enter Story Description...</p>",
  });

  const ProjectCard = ({ project }: { project: any }) => {
    return (
      <Card
        withBorder
        radius="lg"
        shadow="sm"
        padding="lg"
        className="w-130 h-70 mt-lg"
      >
        <Group justify="space-between" align="flex-start">
          <Text fw={600}>{project.name}</Text>
          <ActionIcon variant="subtle">
            <MoreVertical size={18} />
          </ActionIcon>
        </Group>

        <div className="flex justify-between">
          <Badge variant="light" mt="xs" color="blue">
            {project.status}
          </Badge>
          <div className="mr-4">
            <RingProgress
              size={50}
              thickness={5}
              sections={[{ value: project.progress, color: "blue" }]}
              label={
                <Text c="blue" fw={200} ta="center" size="xs">
                  {project.progress}%
                </Text>
              }
            />
          </div>
        </div>

        <Text size="sm" c="dimmed">
          Created Date: {project.createdDate}
        </Text>

        <Text size="sm" mt="md" lineClamp={3}>
          {project.description}
        </Text>

        <Group justify="space-between" mt="lg">
          <Group>
            <Avatar radius="xl" size="sm" color="yellow">
              {project.memberCount}
            </Avatar>
            <ActionIcon color="blue" variant="filled" radius="xl" size="sm">
              <Plus size={16} />
            </ActionIcon>
          </Group>

          <Group>
            <Button
              size="xs"
              variant="subtle"
              leftSection={<Lightbulb size={16} />}
            >
              {project.ideaCount}
            </Button>
            <Button
              size="xs"
              variant="subtle"
              leftSection={<ListChecks size={16} />}
            >
              {project.taskCount}
            </Button>
          </Group>
        </Group>
      </Card>
    );
  };

  return (
    <>
      <Group justify="space-between">
        <Text fw={500}>All Project</Text>
        <Button variant="filled" color="rgba(8, 7, 7, 1)" onClick={open}>
          New Project
        </Button>
      </Group>
      <Tabs defaultValue="active" className="mt-4">
        <Tabs.List>
          <Tabs.Tab value="active">Active</Tabs.Tab>
          <Tabs.Tab value="archive">Archive</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECT_ITEMS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="archive">ss</Tabs.Panel>
      </Tabs>
      <Modal opened={opened} onClose={close} title="Create Project" size="md">
        <div className="flex flex-col gap-4">
          <TextInput
            label="Name"
            variant="filled"
            withAsterisk
            placeholder="Enter Project Name"
          />
          <div>
            <Text size="sm" fw={500}>
              Description <span style={{ color: "red" }}>*</span>
            </Text>
            <RichTextEditor editor={editor} variant="subtle" className="h-80">
              <RichTextEditor.Toolbar
                sticky
                stickyOffset="var(--docs-header-height)"
              >
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          </div>
          <Select
            label="Board Type"
            variant="filled"
            placeholder="Select Board Type"
            withAsterisk
            data={["Kanban", "Scrum"]}
          />
        </div>
        <Group justify="flex-end" mt="xl">
          <Button variant="outline" color="rgba(3,3,3,1)">
            Cancel
          </Button>
          <Button variant="filled" color="rgba(3,3,3,1)">
            Create Project
          </Button>
        </Group>
      </Modal>
    </>
  );
};
