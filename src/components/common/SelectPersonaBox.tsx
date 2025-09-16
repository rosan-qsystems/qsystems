import { Badge, Card } from "@mantine/core";
import { Edit, Trash } from "tabler-icons-react";

export const SelectPersonaBox = () => {
  return (
    <Card className={"primary-card"}>
      <div className={"flex justify-between"}>
        <div>
          <div className="text-md">Sales Representative</div>
          <div className="text-xs font-bold">12,334 Contacts</div>
        </div>
        <div className={"flex items-center gap-md"}>
          <Edit /> <Trash />
        </div>
      </div>
      <div className={"mt-sm"}>
        <div>Job Titles</div>
        <div className={"flex flex-wrap mt-xs gap-xs"}>
          {["CTO", "IT Head", "Marketing Manager"].map((v, key) => (
            <Badge key={key} variant="light" color={"primary"}>
              {v}
            </Badge>
          ))}
        </div>
      </div>
      <div className={"mt-sm"}>
        <div>Management Level</div>
        <div className={"flex flex-wrap mt-xs gap-xs"}>
          {["Manager"].map((v, key) => (
            <Badge key={key} variant="light" color={"secondary"}>
              {v}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};
