import { type VirtualItem, useVirtual } from '@tanstack/react-virtual';
import React from 'react';

type VirtualListProps<T> = {
  result: T[];
  height: number;
  VirtualRowItem: React.FC<{ virtualItem: VirtualItem }>;
  fallback: React.ReactNode,
  estimateSize: (index: number) => number,
}

function VirtualList<T>({ result, height, VirtualRowItem, fallback, estimateSize }: VirtualListProps<T>) {
  const parentRef = React.useRef(null);
  const rowVirtualizer = useVirtual({
    parentRef,
    size: result.length,
    estimateSize,
    overscan: 2,
  });
  return (
    <div
      ref={parentRef}
      style={{
        width: window.innerWidth,
        height,
        overflowY: 'auto',
      }}
    >
      <ul
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {result.length !== 0 ? (
          rowVirtualizer.virtualItems.map((virtualItem) => (
            <VirtualRowItem key={virtualItem.key} virtualItem={virtualItem} />
          ))
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