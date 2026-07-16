import React from 'react';

export interface ImageProps extends React.ComponentProps<'img'> {
	path: string;
	style?: React.CSSProperties;
	width: number;
}

const colors = [
	['#fce7f3', '#f9a8d4'],
	['#ede9fe', '#c4b5fd'],
	['#dbeafe', '#93c5fd'],
	['#ccfbf1', '#5eead4'],
	['#fef3c7', '#fcd34d'],
] as const;

function avatarSource(path: string) {
	const name =
		path
			.split('/')
			.at(-1)
			?.replace(/\.[^.]+$/, '') ?? 'RIZE';
	const initials = name
		.split(/[_-]/)
		.map((part) => part[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();
	const hash = [...name].reduce((total, character) => total + character.charCodeAt(0), 0);
	const [start, end] = colors[hash % colors.length];
	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
			<defs>
				<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
					<stop stop-color="${start}"/>
					<stop offset="1" stop-color="${end}"/>
				</linearGradient>
			</defs>
			<rect width="96" height="96" rx="48" fill="url(#g)"/>
			<text x="48" y="56" text-anchor="middle" font-family="system-ui, sans-serif"
				font-size="28" font-weight="700" fill="#334155">${initials}</text>
		</svg>`;
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const MockImage: React.FC<ImageProps> = ({ path, style, width, alt, ...props }) => (
	<img src={avatarSource(path)} style={style} alt={alt ?? path} width={width * 4} height={width * 4} {...props} />
);
