import { type VirtualItem, useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';

type VirtualListProps<T> = {
	result: T[];
	width: number;
	height: number;
	VirtualRowItem: React.FC<{ virtualItem: VirtualItem }>;
	fallback: React.ReactNode;
	estimateSize: (index: number) => number;
};

function VirtualList<T>({ result, width, height, VirtualRowItem, fallback, estimateSize }: VirtualListProps<T>) {
	const parentRef = React.useRef(null);
	const rowVirtualizer = useVirtualizer({
		getScrollElement: () => parentRef.current,
		count: result.length,
		estimateSize,
		observeElementRect: (_, cb) => {
			cb({ height, width });
		},
		overscan: 2,
	});
	return (
		<div
			ref={parentRef}
			style={{
				width,
				height,
			}}
			className="overflow-y-auto"
		>
			<ul
				style={{
					width,
					height: `${rowVirtualizer.getTotalSize()}px`,
				}}
				className="relative"
			>
				{result.length !== 0 ? (
					rowVirtualizer
						.getVirtualItems()
						.map((virtualItem) => <VirtualRowItem key={virtualItem.key} virtualItem={virtualItem} />)
				) : (
					<div className="flex justify-center align-center text-2xl bg-base-100" role="alert">
						{fallback}
					</div>
				)}
			</ul>
		</div>
	);
}

export default VirtualList;
