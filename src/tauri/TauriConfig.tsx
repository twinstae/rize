import React from 'react';
import { window } from '@tauri-apps/api';
import { HStack, Button } from '../components/rize-ui-web';

function TauriConfig() {
	return (
		<HStack className="gap-2">
			<Button onClick={() => {
				window.getCurrent().setSize(new window.LogicalSize(512, 1024))
					.then(() => { location.reload(); });
			}}>512 x 1024</Button>
			<Button onClick={() => {
				window.getCurrent().setSize(new window.LogicalSize(414, 896))
					.then(() => { location.reload(); });
			}}>414 x 896</Button>
		</HStack>
	);
}

export default TauriConfig;