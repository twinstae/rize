import { Image } from '@chakra-ui/react';
import { downloadDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import React from 'react';
import { useQuery } from 'react-query';

import { withSuspense } from '../hooks/util';

interface Props {
  path: string;
  style: React.CSSProperties;
  width: number;
}

const TauriImage: React.FC<Props> = ({ path, style, width }) => {
  const { data } = useQuery<string, Error>(['image', path], async () => {
    const dir = await downloadDir();
    const filePath = await join(dir, 'output/' + path);
    return convertFileSrc(filePath);
  });
  return (
    <Image
      borderRadius='full'
      src={data ?? `https://via.placeholder.com/${width}`}
      width={width}
      style={style}
    />
  );
};


export default withSuspense(TauriImage);
