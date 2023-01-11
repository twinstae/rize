import { downloadDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import React, { Suspense } from 'react';
import { suspend } from 'suspend-react';
import { ImageProps } from '../components/MockImage';

const TauriLoaded: React.FC<ImageProps> = ({ path, style, width }) => {
  const data = suspend(async () => {
    const dir = await downloadDir();
    const filePath = await join(dir, 'output/' + path);
    return convertFileSrc(filePath);
  }, ['image', path]);

  return <img src={data} width={width * 4} style={style} />;
};

const TauriImage: React.FC<ImageProps> = (props) => {
  return (
    <Suspense
      fallback={
        <img
          src={`https://via.placeholder.com/${props.width}`}
          width={props.width * 4}
          style={props.style}
        />
      }
    >
      <TauriLoaded {...props} />
    </Suspense>
  );
};

export default TauriImage;
