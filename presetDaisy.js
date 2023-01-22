import camelCase from 'camelcase';
import colors from 'daisyui/src/colors/index.js';

const colorEntries = Object.entries(colors);

const presetDaisy = () => ({
	name: 'daisy',
	theme: {
		colors: {
			...Object.fromEntries(
				colorEntries
					.filter(
						([color]) =>
							!['transparent', 'current'].includes(color) &&
              !color.startsWith('base')
					)
					.map(([color, value]) => [camelCase(color), value({})])
			),
			base: Object.fromEntries(
				colorEntries
					.filter(([color]) => color.startsWith('base'))
					.map(([color, value]) => [color.replace('base-', ''), value({})])
			),
		},
	},
	rules: [
		[
			/^rounded-(?:box|btn|badge)$/,
			([name]) => ({ 'border-radius': `var(--${name})` }),
		],
	],
});

export default presetDaisy;
