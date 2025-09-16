import { GitBranch, ServerBolt } from "tabler-icons-react";
import {
  APP_COMMIT_HASH,
  APP_VERSION_NUMBER,
  VERSION_MODE,
} from "../../config/baseURL";
import { Space } from "@mantine/core";

export const VersionData = () => {
  let isProduction = false;
  const year = new Date().getFullYear();

  if (VERSION_MODE === "production") {
    isProduction = true;
  }
  return isProduction ? (
    <div className="flex items-center justify-center">
      <ServerBolt size={20} color="black" />
      <span className="text-xs text-black-500 ml-1">
        App Version:{APP_VERSION_NUMBER}
      </span>
      <Space w="md" />
      <GitBranch size={20} color="black" />
      <span className="text-xs text-black-500 ml-1">
        Commit Hash:{APP_COMMIT_HASH}
      </span>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <span className="text-xs text-black-500 ml-1">
        DevMode
        {/*Development Mode &copy; All rights reserved Groupado*/}
        {/*Inc. {year}*/}
      </span>
    </div>
  );
};
