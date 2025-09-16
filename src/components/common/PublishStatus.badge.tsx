import { Badge } from "@mantine/core";

const statusColorMap: Record<string, string> = {
  published: "green",
  draft: "yellow",
  archive: "gray",
};

export const PublishStatusBadge = (props: { status: string }) => {
  return (
    <Badge
      color={statusColorMap[props.status.toLowerCase()] || "gray"}
      variant="light"
    >
      {props.status}
    </Badge>
  );
};
