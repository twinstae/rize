import React from 'react';
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import { HStack, Button } from '../components/rize-ui-web';

function TauriConfig() {
	return (
		<HStack className="gap-2">
			<Button onClick={() => {
				appWindow.setSize(new LogicalSize(512, 1024))
					.then(() => { location.reload(); });
			}}>512 x 1024</Button>
			<Button onClick={() => {
				appWindow.setSize(new LogicalSize(414, 896))
					.then(() => { location.reload(); });
			}}>414 x 896</Button>
		</HStack>
	);
}

export default TauriConfig;