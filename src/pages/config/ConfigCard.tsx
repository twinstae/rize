import React from 'react';
import { VStack } from '../../components/rize-ui-web';

function ConfigCard({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode | React.ReactNode[];
}) {
	return (
		<VStack className="rize-card gap-3 p-5">
			<h2 id={title + '-config'} className="text-base font-bold text-[var(--rize-text)]">
				{title}
			</h2>
			{children}
		</VStack>
	);
}

export default ConfigCard;
