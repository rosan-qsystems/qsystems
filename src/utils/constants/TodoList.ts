import type {Status, Task} from "../interface/task.interface.ts";

export const statuses: Status[] = [
    { key: "todo", title: "To Do" },
    { key: "inprogress", title: "In Progress" },
    { key: "done", title: "Done" },
];

export const TodoList: Task[] = [
    {
        id: "1",
        title: "User Authentication",
        description: "Enable scrum masters to start a sprint and move backlog stories into it for execution",
        priority: "High",
        assignee: "J",
        code: "MKE-34",
        status: "todo",
    },
    {
        id: "2",
        title: "Create and Prioritize Backlog",
        description: "Enable users to create tasks with a title, description, assignee, priority, and due date",
        priority: "High",
        assignee: "J",
        code: "MKE-35",
        status: "todo",
    },
    {
        id: "3",
        title: "Create UI Design",
        description: "Allow users to move tasks across Kanban board columns",
        priority: "Low",
        assignee: "J",
        code: "MKE-44",
        status: "inprogress",
    },
    {
        id: "4",
        title: "Start and Manage Sprint",
        description: "Enable scrum masters to start a sprint and move backlog stories into it for execution",
        priority: "Medium",
        assignee: "J",
        code: "MKE-45",
        status: "inprogress",
    },
    {
        id: "5",
        title: "Define Customer Flows",
        description: "Enable scrum masters to start a sprint and move backlog stories into it for execution",
        priority: "High",
        assignee: "J",
        code: "MKE-46",
        status: "done",
    },
];
