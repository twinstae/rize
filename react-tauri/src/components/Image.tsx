import React from "react";
import { downloadDir, join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useQuery } from "react-query";
import { withSuspense } from "../hooks/util";

interface Props {
  path: string;
}

function Image({ path }: Props) {
  const { data } = useQuery<string, Error>(["image", path], async () => {
    const dir = await downloadDir();
    const filePath = await join(dir, "output/" + path);
    return convertFileSrc(filePath);
  });

  return <img src={data} width="100%" />;
}

export default withSuspense(Image);
