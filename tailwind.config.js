

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	daisyui: {
		themes: [
			{
				izone: {
					primary: '#ef539d',
					secondary: '#bbb0dc',
					accent: '#d9598c',
					neutral: '#3d4451',
					'base-100': '#fff',
					'base-200': '#ddd',
				},
			},
			'dark',
		],
	},
	plugins: [require('daisyui')],
};