import React from 'react';
import { VStack } from '../../components/rize-ui-web';
function ConfigCard({ title, children }: {title: string, children: React.ReactNode | React.ReactNode[] }){
	return (
		<VStack className="card bg-base-100 ring-1 ring-slate-300 shadow-md p-4 gap-1">
			<h2 id={title + '-config'} className="text-lg font-bold">
				{title}
			</h2>
			{children}
		</VStack>
	);
}

export default ConfigCard;