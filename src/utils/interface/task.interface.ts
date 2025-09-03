export interface Task {
    id: string;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    assignee: string;
    code: string;
    status: "todo" | "inprogress" | "done";
}

export interface Status {
    title: string;
    key: string;
}