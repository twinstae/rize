import { Image } from '@chakra-ui/react';
import React from 'react';

interface Props {
  path: string;
  style: React.CSSProperties;
  width: number;
}

const ROOT = 'https://rize-taehee-kim.s3.ap-northeast-2.amazonaws.com/';
const CapacitorImage: React.FC<Props> = ({ path, style, width }) => {
  return (
    <Image
      borderRadius='full'
      src={ROOT + path}
      width={width}
      style={style}
    />
  );
};

export default CapacitorImage;