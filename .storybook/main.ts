import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@chromatic-com/storybook', '@storybook/addon-vitest', '@storybook/addon-a11y', '@storybook/addon-docs'],
	framework: '@storybook/react-vite',
	async viteFinal(config) {
		config.resolve ??= {};
		config.resolve.alias = {
			...config.resolve.alias,
			'@App': path.resolve(dirname, '../src/web'),
			'@rize/alert': path.resolve(dirname, '../src/error/fakeRizeAlert.ts'),
			'@rize/PlatformConfig': path.resolve(dirname, '../src/web/WebConfig.tsx'),
			src: path.resolve(dirname, '../src'),
		};
		config.plugins = [...(config.plugins ?? []), tailwindcss()];
		return config;
	},
};

export default config;
