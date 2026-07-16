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
			<div
				{...api.getListProps()}
				className="mx-4 mb-2 flex rounded-2xl bg-[var(--rize-surface)] p-1 sm:mx-6"
			>
				{data.map((item, index) => (
					<button
						{...api.getTriggerProps({ value: value(item) })}
						key={value(item)}
						className={`min-h-10 flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
							value(item) === api.value
								? 'bg-base-100 text-[var(--rize-text)] shadow-sm'
								: 'text-[var(--rize-muted)] hover:text-[var(--rize-text)]'
						}`}
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
