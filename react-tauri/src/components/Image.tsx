import React from "react";
import { fs } from "@tauri-apps/api";
import { useQuery } from "react-query";
import { renderQuery } from "../hooks/util";
import { b2a } from "../base64";

interface Props {
  path: string;
}

export const encode = (uint8array: Uint8Array) => {
  const output = [];
  for (let i = 0, { length } = uint8array; i < length; i++)
    output.push(String.fromCharCode(uint8array[i]));
  return b2a(output.join(""));
};

function Image({ path }: Props) {
  const query = useQuery<Uint8Array, Error>(["image", path], async () => {
    return fs.readBinaryFile("output/" + path, {
      dir: fs.BaseDirectory.Download,
    });
  });

  return renderQuery(
    query,
    (data) => {
      const src = "data:image/jpeg;base64," + encode(data);
      return <img src={src} width="100%" />;
    },
    (error) => <span>{path} 에서 파일을 찾지 못했습니다.</span>
  );
}

export default Image;
