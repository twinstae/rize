import { downloadDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import React from 'react';
import { useQuery } from 'react-query';

import { ImageProps } from '../components/MockImage';

const TauriImage: React.FC<ImageProps> = ({ path, style, width }) => {
  const { data } = useQuery<string, Error>(['image', path], async () => {
    const dir = await downloadDir();
    const filePath = await join(dir, 'output/' + path);
    return convertFileSrc(filePath);
  });
  return (
    <img
      src={data ?? `https://via.placeholder.com/${width}`}
      width={width * 4}
      style={style}
    />
  );
};

export default TauriImage;
