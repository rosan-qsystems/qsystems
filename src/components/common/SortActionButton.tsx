import { ActionIcon } from "@mantine/core";
import { ChevronDown, ChevronUp, Minus } from "tabler-icons-react";

export const SortActionButton = (props: any) => {
  const handleClick = () => {
    const isDesc = props.sortBy?.includes("DESC");
    const isSorting = props.sortBy?.includes(props.value);
    props.setSortBy(`${props.value} ${isSorting && !isDesc ? "DESC" : "ASC"}`);
  };

  const getChevronIcon = () => {
    if (!props.sortBy?.includes(props.value))
      return <Minus className="opacity-0 hidden" />;
    return props.sortBy.includes("DESC") ? (
      <ChevronDown size={16} />
    ) : (
      <ChevronUp size={16} />
    );
  };

  return (
    <div
      className="flex items-center sort-action-button rounded-sm hover:underline cursor-pointer"
      onClick={handleClick}
    >
      <div>{props.children}</div>
      <div className="mt-[2px] ml-sm">{getChevronIcon()}</div>
    </div>
  );
};
