import { Badge } from "@mantine/core";

const CommonBadgeColors: Record<string, string> = {
  private: "primary",
  public: "green",
  draft: "gray",
  published: "gray",
  count: "dark",
};

export const CommonBadge = (props: any) => {
  return (
    <Badge
      color={CommonBadgeColors[props.status] ?? "gray"}
      variant={"light"}
      leftSection={props.icon ? props.icon : <></>}
    >
      {props.children}
    </Badge>
  );
};
