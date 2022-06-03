import { downloadDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import React from 'react';
import { useQuery } from 'react-query';

import { withSuspense } from '../hooks/util';

interface Props {
  path: string;
  style: React.CSSProperties;
  width: number;
  height: number;
}

const Image: React.FC<Props> = ({ path, style, width, height }) => {
  const { data } = useQuery<string, Error>(['image', path], async () => {
    const dir = await downloadDir();
    const filePath = await join(dir, 'output/' + path);
    return convertFileSrc(filePath);
  });

  if (data === undefined) return <span>로딩 중</span>;

  return <img src={data} style={style} width={width} height={height} />;
};

export const MockImage: React.FC<Props> = ({ path, style }) => (
  <span style={style}>{path}</span>
);

export default withSuspense(Image);
