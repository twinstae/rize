import React from 'react';

function ConfigHeading({ title }: { title: string }) {
	return (
		<h2 id={title + '-config'} className="text-lg font-bold">
			{title}
		</h2>
	);
}

export default ConfigHeading;
