import { downloadDir, join } from '@tauri-apps/api/path';
import { primitive } from '@tauri-apps/api';
import React, { Suspense } from 'react';
import { suspend } from 'suspend-react';
import { ImageProps } from '../components/MockImage';

const convertFileSrc = primitive.conventFileSrc

let dir: string | null = null;

const TauriLoaded: React.FC<ImageProps> = ({ path, style, width, ...props }) => {
	const filePath = suspend(async () => {
		if (dir === null) {
			dir = await downloadDir();
		}
		return join(dir, 'output/' + path);
	}, ['image', path]);

	return <img src={convertFileSrc(filePath)} width={width * 4} style={style} {...props} />;
};

const TauriImage: React.FC<ImageProps> = ({ width, style, ...props }) => {
	return (
		<Suspense
			fallback={<img src={`https://via.placeholder.com/${Math.floor(width)}`} {...props} width={width * 4} style={style} />}
		>
			<TauriLoaded width={width} style={style} {...props} />
		</Suspense>
	);
};

export default TauriImage;
