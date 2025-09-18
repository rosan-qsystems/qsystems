import {
  Button, Drawer, Grid,
  Group, SegmentedControl,
  Tabs,
  Text, TextInput,
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {useMemo, useState} from "react";
import {PROJECT_ITEMS} from "../../../utils/helper/project.helper";
import {AddProjectForm} from "../../../components/modules/dashboard/projects/AddProject.form.tsx";
import {ProjectCard} from "../../../components/modules/dashboard/projects/Project.card.tsx";
import {Search} from "lucide-react";

export const ProjectPage = () => {
    const [opened, {open, close}] = useDisclosure(false);
    const [activeTab, setActiveTab] = useState('active');
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Enter Story Description...</p>",
    });

    const tabLabels = [
        {label: 'Active', value: 'active'},
        {label: 'Archived', value: 'archived'},
    ];

    return (
        <>
            <Group justify="space-between" mb={'lg'}>
                <div>
                    <div className={'text-xl font-bold'}>All Project</div>
                    <div className="text-md">Manage and track project progress</div>
                </div>
                <div className="flex gap-xs">
                  <TextInput placeholder={'Search Projects'} leftSection={<Search size={16}/>}/>
                  <Button variant="filled" color="rgba(8, 7, 7, 1)" onClick={open}>
                    New Project
                  </Button>
                </div>
            </Group>
            <SegmentedControl
                data={tabLabels}
                value={activeTab}
                onChange={setActiveTab}
            />
            <div className={'mt-sm'}>
                {activeTab === 'active' && <Grid>
                    {PROJECT_ITEMS.map((project) => (
                        <Grid.Col span={4} key={project.id}>
                            <ProjectCard key={project.id} project={project}/>
                        </Grid.Col>
                    ))}
                </Grid>}
            </div>
            <Drawer opened={opened} onClose={close} title="Create Project" size="md">
                <AddProjectForm/>
            </Drawer>
        </>
    );
};
