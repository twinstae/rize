import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Http } from '@capacitor-community/http';
import React from 'react';
import { useQuery } from 'react-query';

import { ImageProps } from '../components/MockImage';

const ROOT = 'https://rize-taehee-kim.s3.ap-northeast-2.amazonaws.com/';

const parseDirname = (path: string) => {
  const temp = path.split('/');
  return temp.slice(0, temp.length - 1).join('/');
}; 

const cache: Map<string, string> = new Map();

const downloadFile = async (path: string): Promise<string> => {
  if (cache.has(path)){
    return cache.get(path) || '';
  }
  const result = await Filesystem.stat({
    path: 'output/'+path,
    directory: Directory.Cache
  }).catch(() => null);

  if(result){
    cache.set(path, Capacitor.convertFileSrc(result.uri));
  } else {
    const url = await Http.downloadFile({
      url: encodeURI(ROOT + path),
      filePath: 'output/'+path,
      fileDirectory: Directory.Cache,
      method: 'GET',
    }).then((result) => result.path && Capacitor.convertFileSrc(result.path) || '')
      .catch(async () => {
        await Filesystem.mkdir({
          path: parseDirname('output/'+path),
          directory: Directory.Cache,
          recursive: true,
        });
        return downloadFile(path);
      });
    cache.set(path, url);
  }

  return cache.get(path) || '';
};

const S3Image: React.FC<ImageProps> = ({ path, style, width }) => {
  const { data: src } = useQuery<string, Error>(['image', path], () => downloadFile(path));
  return (
    <img
      src={src ?? `https://via.placeholder.com/${width}`}
      width={width * 4}
      style={style}
    />
  );
};

export default S3Image;
