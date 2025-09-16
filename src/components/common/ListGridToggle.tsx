import { ClipboardList, GridDots } from "tabler-icons-react";
import { SegmentedControl } from "@mantine/core";

export const ListGridToggle = (props: any) => {
  const { viewMode, setViewMode } = props;
  return (
    <SegmentedControl
      value={viewMode}
      onChange={setViewMode}
      data={[
        { label: <ClipboardList />, value: "list" },
        { label: <GridDots />, value: "grid" },
      ]}
    />
  );
};
