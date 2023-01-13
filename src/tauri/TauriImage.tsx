import { downloadDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import React, { Suspense } from 'react';
import { suspend } from 'suspend-react';
import { ImageProps } from '../components/MockImage';

const TauriLoaded: React.FC<ImageProps> = ({ path, style, width, ...props }) => {
  const data = suspend(async () => {
    const dir = await downloadDir();
    const filePath = await join(dir, 'output/' + path);
    return convertFileSrc(filePath);
  }, ['image', path]);

  return <img src={data} width={width * 4} style={style} {...props} />;
};

const TauriImage: React.FC<ImageProps> = ({ width, style, ...props}) => {
  return (
    <Suspense
      fallback={
        <img
          src={`https://via.placeholder.com/${width}`}
          {...props}
          width={width * 4}
          style={style}
        />
      }
    >
      <TauriLoaded width={width} style={style} {...props} />
    </Suspense>
  );
};

export default TauriImage;
