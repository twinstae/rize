import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Http } from '@capacitor-community/http';
import React, { Suspense } from 'react';

import { ImageProps } from '../components/MockImage';
import { suspend } from 'suspend-react';
import invariant from '../invariant';

const ROOT = 'https://image.rabolution.com/';

const parseDirname = (path: string) => {
  const temp = path.split('/');
  return temp.slice(0, temp.length - 1).join('/');
}; 

const cache: Map<string, string> = new Map();

const directoryDict = new Map<string, Promise<void>>();
const loadingDict = new Map<string, Promise<string>>();

const downloadFile = async (path: string): Promise<void> => {
  const dirPath = parseDirname('output/'+path);
  const dirPathPromise = directoryDict.get(dirPath);
  if (dirPathPromise) {
    await dirPathPromise;
  } else {
    const promise = Filesystem.mkdir({
      path: dirPath,
      directory: Directory.Cache,
      recursive: true,
    }).catch(() => undefined);
    directoryDict.set(dirPath, promise);
    await promise;
  }        
  
  if (loadingDict.get(path)){
    return;
  }

  const srcPromise = Http.downloadFile({
    url: encodeURI(ROOT + path.replace('img/', '')),
    filePath: 'output/'+path,
    fileDirectory: Directory.Cache,
    method: 'GET',
  }).then((result) => result.path && Capacitor.convertFileSrc(result.path)  || '')
    .catch(() => '');
  loadingDict.set(path, srcPromise);
  
  const src = await srcPromise;
  cache.set(path, src || '');
};

async function getCacheSrc(path: string, width: number): Promise<string>{
  if (path === '') {
    return `https://via.placeholder.com/${width}`;
  }
  if (cache.has(path)){
    const src = cache.get(path);
    invariant(src !== undefined);
    return src.replace(`http://${location.hostname}:5174//`, 'http://localhost/');
  }
  const result = await Filesystem.stat({
    path: 'output/'+path,
    directory: Directory.Cache
  }).catch(() => null);

  if(result){
    cache.set(path, Capacitor.convertFileSrc(result.uri));
    return getCacheSrc(path, width);
  }
  void downloadFile(path);
  return encodeURI(ROOT + path.replace('img/', ''));
}

const ImageLoaded: React.FC<ImageProps> = ({ path, style, width, ...props }) => {
  const src = suspend(() => getCacheSrc(path, width), ['image', path, width]);

  return (
    <img
      src={src}
      width={width * 4}
      style={style}
      {...props}
    />
  );
};

const S3Image: React.FC<ImageProps> = ({ path, style, width, ...props }) => {
  return (
    <Suspense
      fallback={
        <img
          src={`https://via.placeholder.com/${width}`}
          width={width * 4}
          style={style}
          {...props}
        />
      }
    >
      <ImageLoaded path={path} style={style} width={width} {...props}/>
    </Suspense>
  );
};

export default S3Image;
