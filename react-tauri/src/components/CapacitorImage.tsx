import { Image } from '@chakra-ui/react';
import React from 'react';

interface Props {
  path: string;
  style: React.CSSProperties;
  width: number;
}

const CapacitorImage: React.FC<Props> = ({ path, style, width }) => {
  return (
    <Image
      borderRadius='full'
      src={'https://raw.githubusercontent.com/twinstae/izone-pm-viewer/main/dist/' + path || `https://via.placeholder.com/${width}`}
      width={width}
      style={style}
    />
  );
};

export default CapacitorImage;