export const PROJECT_ITEMS: Array<{
  id: number;
  name: string;
  status: string;
  progress: number;
  createdDate: string;
  description: string;
  memberCount: number;
  ideaCount: number;
  taskCount: number;
}> = [
  {
    id: 1,
    name: "Ecommerce",
    status: "In Progress",
    progress: 0,
    createdDate: "Feb 14th",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ab neque, fugit aspernatur, officia aliquid, saepe ratione atque minus odit cupiditate quae veniam.",
    memberCount: 0,
    ideaCount: 0,
    taskCount: 1,
  },
  {
    id: 2,
    name: "Kanban Board",
    status: "Not Started",
    progress: 0,
    createdDate: "Jun 13th",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ab neque, fugit aspernatur, officia aliquid, saepe ratione atque minus odit cupiditate quae veniam.",
    memberCount: 0,
    ideaCount: 0,
    taskCount: 1,
  },
  {
    id: 3,
    name: "Scrum Prototype",
    status: "In Progress",
    progress: 0,
    createdDate: "Aug 25th",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ab neque, fugit aspernatur, officia aliquid, saepe ratione atque minus odit cupiditate quae veniam.",
    memberCount: 0,
    ideaCount: 0,
    taskCount: 1,
  },
  {
    id: 4,
    name: "SAAS Dashboard",
    status: "In Progress",
    progress: 0,
    createdDate: "July 26th",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ab neque, fugit aspernatur, officia aliquid, saepe ratione atque minus odit cupiditate quae veniam.",
    memberCount: 0,
    ideaCount: 0,
    taskCount: 1,
  },
  {
    id: 5,
    name: "Portfolio Builder",
    status: "Not Started",
    progress: 0,
    createdDate: "Sep 25th",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ab neque, fugit aspernatur, officia aliquid, saepe ratione atque minus odit cupiditate quae veniam.",
    memberCount: 0,
    ideaCount: 0,
    taskCount: 1,
  },
  {
    id: 6,
    name: "Internship Portal",
    status: "In Progress",
    progress: 0,
    createdDate: "Dec 30th",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ab neque, fugit aspernatur, officia aliquid, saepe ratione atque minus odit cupiditate quae veniam.",
    memberCount: 0,
    ideaCount: 0,
    taskCount: 1,
  },
];

export const EPIC_LISTS: Array<{
  id: string;
  title: string;
  assignee: string;
  progress: number;
}> = [
  {
    id: "MKE-2",
    title: "User Authentication",
    assignee: "Green Goblin",
    progress: 0,
  },
  {
    id: "MKE-7",
    title: "User Security",
    assignee: "Rodger Federer",
    progress: 0,
  },
  {
    id: "MKE-8",
    title: "Project & Team Management",
    assignee: "Frank Colin",
    progress: 0,
  },
];

export const STORY_LISTS: Array<{
  id: string;
  title: string;
  status: string;
}> = [
  { id: "MKE-9", title: "User Login", status: "TODO" },
  { id: "MKE-8", title: "User Registration", status: "IN PROGRESS" },
  {
    id: "MKE-3",
    title: "UI Setup for Mero Kishan Web and Mobile in Figma",
    status: "DONE",
  },
];
