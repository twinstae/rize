import { Image } from '@chakra-ui/react';
import React from 'react';

import { ImageProps } from '../components/MockImage';


const ROOT = 'https://rize-taehee-kim.s3.ap-northeast-2.amazonaws.com/';
const S3Image: React.FC<ImageProps> = ({ path, style, width }) => {
  return (
    <Image
      borderRadius='full'
      src={ROOT + path}
      width={width}
      style={style}
    />
  );
};

export default S3Image;