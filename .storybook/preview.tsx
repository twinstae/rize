import type { Preview } from '@storybook/react-vite';
import { setupIonicReact } from '@ionic/react';
import '../src/i18n/i18n';
import '../src/index.css';
import '@ionic/react/css/core.css';
import { withRizeProviders } from '../src/stories/decorators';

setupIonicReact();

const preview: Preview = {
	decorators: [withRizeProviders],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			test: 'todo',
		},
		layout: 'padded',
	},
};

export default preview;
