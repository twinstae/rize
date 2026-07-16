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
		<div {...api.getRootProps()} className="bg-base-100">
			<div {...api.getListProps()} className="mx-4 mb-3 flex gap-1 rounded-2xl bg-[var(--rize-surface)] p-1.5 sm:mx-5">
				{data.map((item, index) => {
					const isActive = value(item) === api.value;
					return (
						<button
							{...api.getTriggerProps({ value: value(item) })}
							key={value(item)}
							className={`flex-1 rounded-xl px-2 py-1 text-sm font-semibold transition-all duration-200 ${
								isActive
									? 'bg-base-100 text-[var(--rize-text)] shadow-[var(--rize-shadow-sm)]'
									: 'text-[var(--rize-muted)] hover:text-[var(--rize-text)]'
							}`}
						>
							<Label index={index} />
						</button>
					);
				})}
			</div>
			{data.map((item, index) => (
				<div {...api.getContentProps({ value: value(item) })} key={value(item)}>
					<Content index={index} />
				</div>
			))}
		</div>
	);
}
