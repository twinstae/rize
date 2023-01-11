import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';

import { useResults } from '../mailList/useResult';
import { rem } from '../theme/rem';
import MailListItem from './MailListItem';

interface Props {
  index: number;
}

const height = window.innerHeight - rem(4.2);

function MailList({ index }: Props) {
  const result = useResults()[index];
  const parentRef = React.useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: result.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rem(6),
    overscan: 2,
  });
  return (
    <div
      ref={parentRef}
      style={{
        width: window.innerWidth,
        height,
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}
      className="bg-base-100"
    >
      <ul
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {result.length !== 0 ? (
          rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <MailListItem
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
              mail={result[virtualItem.index]}
            />
          ))
        ) : (
          <div className="flex justify-center align-center text-2xl bg-base-100" role="alert">
            검색결과가 없습니다
          </div>
        )}
      </ul>
    </div>
  );
}

export default MailList;
