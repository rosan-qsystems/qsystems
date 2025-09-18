import {Button, Card, Group, ActionIcon, Text, Badge, Progress, Avatar,} from "@mantine/core";
import {MoreHorizontal, Plus, Lightbulb, ListChecks} from 'lucide-react';

export const ProjectCard = (props)=>{
    const {project} = props;
        return (
            <Card
                withBorder
                radius="lg"
                padding="lg"
                className=""
            >
                <Group justify="space-between" align="flex-start">
                    <Text fw={600}>{project.name}</Text>
                    <ActionIcon variant="subtle" color={'dark'}>
                        <MoreHorizontal size={18} />
                    </ActionIcon>
                </Group>

                <div className="flex justify-between">
                    <Badge variant="light" mt="xs" color="blue">
                        {project.status}
                    </Badge>
                </div>

                <Text size="sm" c="dimmed">
                    Created Date: {project.createdDate}
                </Text>

                <Text size="sm" mt="md" lineClamp={3}>
                    {project.description}
                </Text>
                <div className="mt-xs">
                    <Progress
                        value={30}
                        sections={[{ value: project.progress, color: "blue" }]}
                        label={
                            <Text c="blue" fw={200} ta="center" size="xs">
                                {project.progress}%
                            </Text>
                        }
                    />
                </div>
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

}