import { useNavigate } from "react-router-dom";
import { ActionIcon } from "@mantine/core";
import { ChevronLeft } from "tabler-icons-react";

export const StackTitleComponent = (props: any) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center py-xs ${props.fullWidth ? "w-full" : ""}`}
    >
      {props.isBack ? (
        <ActionIcon onClick={() => navigate(-1)} variant={"subtle"}>
          <ChevronLeft />
        </ActionIcon>
      ) : (
        <></>
      )}
      <div className={"text-lg font-semibold leading-7"}>{props.children}</div>
    </div>
  );
};
