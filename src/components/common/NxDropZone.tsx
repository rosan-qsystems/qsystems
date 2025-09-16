import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { getImageUrl } from "../../utils/helpers/imageUrlHandler";
import { CloudUpload } from "tabler-icons-react";
import React from "react";

export const NxDropZone = (props: any) => {
  const { parentIndex, handleDrop, data } = props;
  return (
    <Dropzone
      accept={IMAGE_MIME_TYPE}
      onDrop={(file) => handleDrop(file, parentIndex)}
      multiple={false}
      p={"xs"}
      className={
        "flex-grow flex justify-center h-full w-full aspect-square p-xs"
      }
    >
      {data.img ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          <img
            src={
              typeof data.img === "string"
                ? getImageUrl(data.img)
                : URL.createObjectURL(data.img)
            }
            alt="Cover Image"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              borderRadius: "8px",
              aspectRatio: "1 / 1",
            }}
          />
        </div>
      ) : (
        <>
          <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: "32px" }}
          >
            <CloudUpload size={30} />
          </div>
        </>
      )}
    </Dropzone>
  );
};
