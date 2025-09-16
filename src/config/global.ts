export const API_URL = `${import.meta.env.VITE_API_URL}`;
export const SAST_API_URL = `${import.meta.env.VITE_SAST_API_URL}`;

export const TIMEZONE = "timezone";
export const STORAGE_KEY = "QSystems";
export const LOGIN_TIME = "login_time";
export const GITHUB_STORAGE_KEY = "github_token";
export const GITLAB_STORAGE_KEY = "gitlab_token";
export const AVATAR_COLOR = "user_avatar_color";

export const FALLBACK_TIMEZONE = "Etc/GMT";

export const PROGRESS_COLOR_SCHEME = Object.freeze([
  "red",
  "teal",
  "orange",
  "blue",
  "green",
]);

export const routeConstants = Object.freeze({
  // API URLS
  LOGIN_API: `/api/tokens/grant`,
  SIGNUP_API: `/api/users/sign-up`,
  SETPASSWORD_API: `/api/users/set-password`,
  REFRESH_TOKEN_URL: `/api/tokens/refresh`,
  REQUEST_PASSWORD_CHANGE_API: `/api/email/request-password-reset`,
  USER_API: `/api/users/`,
  PROJECT_API: `/api/projects/`,
  ARCHIVED_PROJECT_API: `/api/projects/archived/`,
  PROFILE_URL: `/api/users/me`,
  IDEATION_API: `/api/ideations/`,
  PRD_API: `/api/ideations/prds`,
  SUMMARY_API: `/api/ideations/summary`,
  PRD_GENERATE_API: `/api/ideations/generate-prd`,
  PRD_SUMMARIZE_API: `/api/ideations/summarize-prd`,
  EPICS_API: `/api/epics/`,
  STORIES_API: `/api/stories/`,
  TASKBOARD_API: `/api/taskboard`,
  TASK_API: `/api/tasks`,
  TESTCASE_API: `/api/tests`,
  GENERATE_STORY_API: `/api/taskboardai/generate-stories`,
  GENERATE_EPICS_API: `/api/taskboardai/generate-epics`,
  GENERATE_TASKS_API: `/api/taskboardai/generate-tasks`,
  GENERATE_TESTCASES_API: `/api/taskboardai/generate-testcases`,
  COMPLIANCE_API: `/api/compliance-templates/`,
  DOCUMENT_API: `/api/project-documents`,
  REGRESSION_API: `/api/regressions/`,
  BACKLOG_API: `/api/backlogs/`,
  BOARD_API: `/api/boards/`,
  BOARDSETTING_API: `/api/settings/boards/`,
  COMMENT_API: `/api/comments`,
  JIRA_INTEGRATION_API: `/api/integrations/jira/`,
  SETTING_API: `/api/settings/general/`,
  FORGOT_PASSWORD: `/api/settings/general/password/forgot`,
  RESET_PASSWORD: `/api/settings/general/password/reset`,
  ATTACHMENTAPI: `/api/attachments`,
  ACTIVITY_API: `/api/activity/entity`,
  ASSIGNEE_API: `/api/assignees`,
  LIST_API: `/api/list`,
  HIERARCHY_API: `/api/permission/hierarchy`,
  ENDPOINTS_API: `/api/permission/endpoint`,

  // SAST API URLS
  CONNECTION_IDENTIFIER_API: `${SAST_API_URL}/api/v1/connections`,
  CONNECT_REPO_API: `${SAST_API_URL}/api/v1/connections/repos`,
  GITHUB_LOGIN_API: `${SAST_API_URL}/api/v1/github/login`,
  GITHUB_TOKEN_API: `${SAST_API_URL}/api/v1/github/token`,
  GITHUB_USER_INO_API: `${SAST_API_URL}/api/v1/github/userinfo`,
  GITHUB_REPO_API: `${SAST_API_URL}/api/v1/github/repo`,
  SONARQUBE_API: `${SAST_API_URL}/api/v1/sonarqube/projects`,
  SBOM_API: `${SAST_API_URL}/api/v1/sbom/projects`,
  GITLAB_LOGIN_API: `${SAST_API_URL}/api/v1/gitlab/login`,
  GITLAB_TOKEN_API: `${SAST_API_URL}/api/v1/gitlab/token`,
  GITLAB_USER_INO_API: `${SAST_API_URL}/api/v1/gitlab/userinfo`,
  GITLAB_PROJECT_API: `${SAST_API_URL}/api/v1/gitlab/projects`,
  PROJECT_SCAN_API: `${SAST_API_URL}/api/v1/sbom/projects/scan`,
  FILE_API: `${SAST_API_URL}/api/v1/files`,
  FILE_SBOM_SCAN_API: `${SAST_API_URL}/api/v1/sbom/file/scan`,
  FILE_SMART_SCAN_API: `${SAST_API_URL}/api/v1/sonarqube/file/scan`,
  FILE_REPORT_API: `${SAST_API_URL}/api/v1/file-reports`,
  PROJECT_SCAN_SONARQUBE_API: `${SAST_API_URL}/api/v1/sonarqube/projects/scan`,
  UPLOAD_ZIP_DOCUMENT_API: `${SAST_API_URL}/api/v1/upload/file`,
  TEST_COVERAGE_API: `/api/coverage`,

  PERMISSION_API: `/api/organizations/permissions`,
  PERMISSION_SCOPE_API: `/api/roles/scope`,
  ROLES_API: `/api/roles/`,
  REPORT_API: `/api/reports`,
  ORGANIZATION_REPORT_API: `/api/organization/reports`,
  DASHBOARD_API: `/api/dashboard`,
  TASK_STATUS_API: `/api/status`,
  NOTIFICATION_API: `/api/notifications`,
  SPRINT_API: `/api/sprints`,
});

export const SUCCESS_CODES = Object.freeze(["SUCCESS"]);

export const ERROR_CODES = Object.freeze(["ERROR", "BAD_REQUEST"]);

// export const REFRESH_TIMEOUT = 2700000; // 45 minutes
export const REFRESH_TIMEOUT = 1500000; // 25 minutes

export const TOAST_TIMEOUT = 3000;
export const TASK_STATUS_TIMEOUT = 3000;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+=^])[A-Za-z\d@$!%*?&#+=^]{8,}$/;

export const DATE_FORMAT = {
  YYYY_MM_DD_00_00_00_ZZZ: "yyyy-MM-dd 00:00:00ZZZ",
};

export const markdownExtensions = [
  ".md",
  ".markdown",
  ".mdown",
  ".mkd",
  ".mdwn",
  ".mdtxt",
  ".mdtext",
];
