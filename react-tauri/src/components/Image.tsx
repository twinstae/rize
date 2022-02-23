import React from "react";
import { downloadDir, join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useQuery } from "react-query";
import { withSuspense } from "../hooks/util";

interface Props {
  path: string;
  style: React.CSSProperties;
}

const Image: React.FC<Props> = ({ path, style }) => {
  const { data } = useQuery<string, Error>(["image", path], async () => {
    const dir = await downloadDir();
    const filePath = await join(dir, "output/" + path);
    return convertFileSrc(filePath);
  });

  return <img src={data} style={style} />;
};

export default withSuspense(Image);
