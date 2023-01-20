import React from 'react';
// import { Capacitor } from '@capacitor/core';
// import { Directory, Filesystem } from '@capacitor/filesystem';
// import { Http } from '@capacitor-community/http';

import { ImageProps } from '../components/MockImage';
const ROOT = 'https://image.rabolution.com/';

const S3Image: React.FC<ImageProps> = ({ path, style, width, ...props }) => {
	return (
		<img src={`${ROOT}${path.replace('img/', '')}`} style={style} alt="" width={width * 4} {...props} />
	);
};

export default S3Image;
