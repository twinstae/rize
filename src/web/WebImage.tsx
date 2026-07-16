import React, { useState } from 'react';

import { ImageProps, MockImage } from '../components/MockImage';

function toOutputSrc(path: string) {
	return `/output/${path.split('/').map(encodeURIComponent).join('/')}`;
}

const WebImage: React.FC<ImageProps> = ({ path, style, width, alt, ...props }) => {
	const [failed, setFailed] = useState(false);

	if (failed) {
		return <MockImage path={path} style={style} width={width} alt={alt} {...props} />;
	}

	return (
		<img
			src={toOutputSrc(path)}
			style={style}
			width={width * 4}
			height={width * 4}
			alt={alt ?? path}
			onError={() => setFailed(true)}
			{...props}
		/>
	);
};

export default WebImage;
