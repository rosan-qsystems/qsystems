import { IoLogoGithub, IoLogoGitlab } from "react-icons/io5";
// import { SiJira } from "react-icons/si";

export const commons = Object.freeze({
  SUCCESS: "success",
  ERROR: "ERROR",
});

export const userRoles = Object.freeze([
  {
    label: "Admin",
    value: "ADMIN",
  },
  { label: "Editor", value: "EDITOR" },
  { label: "Viewer", value: "VIEWER" },
]);

export const projectAccessTypes = Object.freeze([
  {
    label: "Private",
    value: "PRIVATE",
  },
  {
    label: "Public",
    value: "PUBLIC",
  },
]);

export const storyStatusOptions = Object.freeze([
  {
    label: "To Do",
    value: "TO_DO",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Done",
    value: "DONE",
  },
  {
    label: "QA",
    value: "QA",
  },
  {
    label: "In Preview",
    value: "IN_PREVIEW",
  },
  {
    label: "On Hold",
    value: "ON_HOLD",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
]);

export const priorityOptions = Object.freeze([
  {
    label: "Low",
    value: "LOW",
  },
  {
    label: "Medium",
    value: "MEDIUM",
  },
  {
    label: "High",
    value: "HIGH",
  },
]);

export const storyTypeOptions = Object.freeze([
  {
    label: "Feature",
    value: "FEATURE",
  },
  {
    label: "Bug",
    value: "BUG",
  },
  {
    label: "Chore",
    value: "CHORE",
  },
  {
    label: "Spike",
    value: "SPIKE",
  },
  {
    label: "Technical Debt",
    value: "TECHNICAL_DEBT",
  },
  {
    label: "Task",
    value: "TASK",
  },
  {
    label: "User Story",
    value: "USER_STORY",
  },
  {
    label: "Improvement",
    value: "IMPROVEMENT",
  },
]);

export const categoryOptions = Object.freeze([
  {
    label: "User Management",
    value: "USER MANAGEMENT",
  },
  {
    label: "Development",
    value: "DEVELOPMENT",
  },
  {
    label: "Improvement",
    value: "IMPROVEMENT",
  },
]);

export const GIT_APP = Object.freeze([
  {
    label: "GitHub",
    value: "github",
    icon: <IoLogoGithub />,
  },
  {
    label: "GitLab",
    value: "gitlab",
    icon: <IoLogoGitlab />,
  },
  // {
  //   label: "Bitbucket",
  //   value: "bitbucket",
  //   icon: <SiJira />,
  // },
]);

export const USER_AVATAR_COLOR = Object.freeze([
  "#5E7E56",
  "#81B6B2",
  "#A36280",
  "#E99F24",
  "#E94325",
  "#195788",
  "#81B6B2",
  "#745540",
  "#00B4C0",
  "#0072B3",
  "#00B4C0",
]);
