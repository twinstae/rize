import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Http } from '@capacitor-community/http';
import { Image } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';

import { ImageProps } from '../components/MockImage';

const ROOT = 'https://rize-taehee-kim.s3.ap-northeast-2.amazonaws.com/';
const downloadFile = async (path: string): Promise<string> => {
  const result = await Filesystem.stat({
    path: 'output/'+path,
    directory: Directory.Cache
  }).catch(() => null);
  if(result){
    return Capacitor.convertFileSrc(result.uri);
  }
  return Http.downloadFile({
    url: encodeURI(ROOT + path),
    filePath: 'output/'+path,
    fileDirectory: Directory.Cache,
    method: 'GET',
  }).then(() => downloadFile(path));
};

const S3Image: React.FC<ImageProps> = ({ path, style, width }) => {
  const { data: src } = useQuery<string, Error>(['image', path], () => downloadFile(path));
  return (
    <Image
      borderRadius='full'
      src={src ?? `https://via.placeholder.com/${width}`}
      width={width}
      style={style}
    />
  );
};

export default S3Image;
