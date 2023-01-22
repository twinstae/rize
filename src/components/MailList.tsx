import React from 'react';

import { rem } from '../theme/rem';
import MailListItem from './MailListItem';
import { useMailList } from '../hooks/Dependencies';
import { modes } from '../mailList/mailListModel';
import { VirtualList } from './rize-ui-web';
interface Props {
	index: number;
}

const height = window.innerHeight - rem(5.5);

function MailList({ index }: Props) {
	const result = useMailList().mailList(modes[index]);
	// The virtualizer
	return (
		<VirtualList
			result={result}
			width={window.innerWidth}
			height={height}
			estimateSize={() => rem(5)}
			VirtualRowItem={({ virtualItem }) => (
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
			)}
			fallback={
				<div className="flex justify-center align-center text-2xl bg-base-100" role="alert">
					검색결과가 없습니다
				</div>
			}
		/>
	);
}

export default MailList;
