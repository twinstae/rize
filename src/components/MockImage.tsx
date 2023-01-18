import React from 'react';

export interface ImageProps extends React.ComponentProps<'img'> {
	path: string;
	style?: React.CSSProperties;
	width: number;
}

export const MockImage: React.FC<ImageProps> = ({ path, style, width, ...props }) => (
	<img src={`http://${window.location.hostname}:8000/${path}`} style={style} alt="" width={width * 4} {...props} />
);
