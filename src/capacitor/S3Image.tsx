import React from 'react';
import { useAtomValue } from 'jotai';
import { ImageProps } from '../components/MockImage';
import useCacheSrcAtom from './useCacheSrc';

const S3Image: React.FC<ImageProps> = ({ path, style, width, ...props }) => {
	const useCacheSrc = useAtomValue(useCacheSrcAtom);
	const src = useCacheSrc(path);
	return (
		<img src={src} style={style} alt="" width={width * 4} {...props} />
	);
};

export default S3Image;
