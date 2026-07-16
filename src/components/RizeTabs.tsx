import React from 'react';
import * as tabs from '@zag-js/tabs';
import { useMachine, normalizeProps } from '@zag-js/react';

interface RizeTabsProps<T> {
	data: readonly T[];
	value: (item: T) => string;
	Label: React.FC<{ index: number }>;
	Content: (props: { index: number }) => React.ReactElement;
	onChange?: (details: { value: string | null }) => void;
}

export function RizeTabs<T>({ data, value, Label, Content, onChange }: RizeTabsProps<T>) {
	const service = useMachine(tabs.machine, {
		id: 'rize-tabs',
		defaultValue: value(data[0]),
		onValueChange: onChange,
	});

	const api = tabs.connect(service, normalizeProps);

	return (
		<div {...api.getRootProps()}>
			<div {...api.getListProps()} className="tabs flex justify-around">
				{data.map((item, index) => (
					<button
						{...api.getTriggerProps({ value: value(item) })}
						key={value(item)}
						className={`bg-base-100 tab tab-bordered w-1/3 ${value(item) === api.value ? 'tab-active' : ''}`}
					>
						<Label index={index} />
					</button>
				))}
			</div>
			{data.map((item, index) => (
				<div {...api.getContentProps({ value: value(item) })} key={value(item)}>
					<Content index={index} />
				</div>
			))}
		</div>
	);
}
