import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  type DropzoneProps,
} from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {CloudUpload, MoreVertical, Plus, Search, SlidersHorizontal} from "lucide-react";
import { useState } from "react";
import {statuses, TodoList} from "../../../utils/constants/TodoList.ts";
import type {Status, Task} from "../../../utils/interface/task.interface.ts";

export const BoardPage = (props: Partial<DropzoneProps>) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<string | null>(null);

  const editors = useEditor({
    extensions: [StarterKit],
    content: "<p>Enter Story Description...</p>",
  });

  return (
    <>
      <div className={'text-sm mb-md -mt-md'}>Project &gt; QS Project Board Development &gt; Board</div>
      <div className={'flex justify-between items-center mb-lg gap-3'}>
        <div>
          <div className={'text-xl font-bold mb-xs'}>Project Board</div>
          <p>Track your progress clearly</p>
        </div>
        <div className={'flex items-center gap-3'}>
          <TextInput
              radius="xs"
              rightSectionPointerEvents="none"
              rightSection={<Search size={14} />}
              placeholder="Search"
          />
          <Button leftSection={<SlidersHorizontal size={14} />} variant="light" color="blue" radius="xs">
            Filter
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        {statuses.map((col: Status) => (
            <div key={col.key} className="h-210 w-85 bg-gray-100 rounded">
              <Group className="p-sm" justify="space-between">
                <Text>{col.title}</Text>
                <Button
                    leftSection={<Plus size={14} />}
                    variant="light"
                    color="blue"
                    radius="xs"
                    size="xs"
                    onClick={open}
                >
                  Add
                </Button>
              </Group>

              {TodoList
                  .filter((task: Task) => task.status === col.key)
                  .map((task: Task) => (
                      <Card
                          key={task.id}
                          withBorder
                          radius="lg"
                          shadow="sm"
                          className="w-75 h-52 mt-xs ml-sm border border-gray-300"
                      >
                        <div className="flex justify-between items-center mb-xs">
                          <Badge
                              variant="light"
                              color={
                                task.priority === "High"
                                    ? "red"
                                    : task.priority === "Medium"
                                        ? "blue"
                                        : "gray"
                              }
                              radius="xs"
                          >
                            {task.priority}
                          </Badge>
                          <ActionIcon variant="subtle" color="rgba(0,0,0,1)">
                            <MoreVertical size={18} />
                          </ActionIcon>
                        </div>

                        <div className="flex flex-col gap-1">
                          <Text fw={500}>{task.title}</Text>
                          <Text size="sm">{task.description}</Text>
                          <div className="flex justify-between mr-8 mt-xs">
                            <Avatar radius="xl" size="md" color="yellow">
                              {task.assignee}
                            </Avatar>
                            <div className="mt-xs text-sm">{task.code}</div>
                          </div>
                        </div>
                      </Card>
                  ))}

              <div className="flex justify-center items-center border border-dashed m-sm py-1.5 rounded cursor-pointer">
                <Text>Add Task</Text>
                <Plus size={14} />
              </div>
            </div>
        ))}
      </div>

      <Modal opened={opened} onClose={close} title="Create Story" size={"auto"}>
        <Grid>
          <Grid.Col span={8}>
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
                <RichTextEditor
                  editor={editors}
                  variant="subtle"
                  className="h-60"
                >
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
              <div>
                <Text size="sm" fw={500}>
                  Acceptance Criteria <span style={{ color: "red" }}>*</span>
                </Text>
                <RichTextEditor
                  editor={editors}
                  variant="subtle"
                  className="h-60"
                >
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
            </div>
          </Grid.Col>
          <Grid.Col span={4}>
            <div className="flex flex-col gap-6">
              <TextInput
                label="Estimated Size"
                variant="filled"
                withAsterisk
                placeholder="Enter Estimated Size"
              />
              <Select
                label="Priority"
                variant="filled"
                placeholder="Select Priority"
                withAsterisk
                data={["High", "Medium", "Low"]}
              />
              <Select
                label="Status"
                variant="filled"
                placeholder="Select Status"
                withAsterisk
                data={["To Do", "In Progress", "Done"]}
              />
              <Select
                label="Story Type"
                variant="filled"
                placeholder="Select Story Type"
                withAsterisk
                data={["Bug", "Feature", "Task"]}
              />
              <DatePickerInput
                label="Pick date"
                placeholder="Pick date"
                variant="filled"
                value={value}
                onChange={setValue}
              />
              <Select
                label="Assign to"
                variant="filled"
                placeholder="Select Assignee"
                withAsterisk
                data={["Kanban", "Scrum"]}
              />
              <Select
                label="Report To"
                variant="filled"
                placeholder="Select Report To"
                withAsterisk
                data={["Kanban", "Scrum"]}
              />
              <Dropzone
                onDrop={(files) => console.log("accepted files", files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                {...props}
                  style={{ minHeight: 120, pointerEvents: 'none' }}
              >
                {/* <Group gap="xl" mih={80} style={{ pointerEvents: 'none' }}> */}
                <div className="h-full flex items-center justify-center gap-4">
                  <CloudUpload size={80} />
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Drop files to attach or Browse Files Supported files: PDF,
                    DOCX, PPT, XLSX, JPG, JPEG, PNG, GIF, WEBP, MP4
                  </Text>
                </div>
                {/* </Group> */}
              </Dropzone>
            </div>
          </Grid.Col>
        </Grid>

        <Group justify="flex-end" mt="xl">
          <Button variant="outline" color="blue" radius="xs">
            Cancel
          </Button>
          <Button variant="filled" color="blue" radius="xs">
            Create Story
          </Button>
        </Group>
      </Modal>
    </>
  );
};
