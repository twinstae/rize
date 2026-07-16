import React from 'react';

import { rem } from '../theme/rem';
import MailListItem from './MailListItem';
import { useMailList } from '../hooks/Dependencies';
import { modes } from '../mailList/mailListModel';
import { FloatingArea, VirtualList, Text, VStack } from './rize-ui-web';
import useOrder from '../config/useOrder';
import OrderToggleButton from './OrderToggleButton';
import { getItem } from '../utils';
import RandomMailButton from './RandomMailButton';

interface Props {
	index: number;
}

const height = window.innerHeight - rem(8.25);

function MailList({ index }: Props) {
	const { mailList } = useMailList();
	const result = mailList(modes[index]);
	const { isReverse } = useOrder();

	return (
		<VStack className="relative bg-base-100">
			<VirtualList
				result={result}
				width={window.innerWidth}
				height={height}
				estimateSize={() => rem(4.75)}
				VirtualRowItem={({ virtualItem, style }) => (
					<MailListItem
						key={virtualItem.key}
						style={style}
						mail={getItem(isReverse, result, virtualItem.index)}
						index={virtualItem.index}
					/>
				)}
				fallback={
					<div className="flex h-64 flex-col items-center justify-center gap-2 text-center" role="alert">
						<span className="text-3xl">✉️</span>
						<Text className="text-sm font-medium text-[var(--rize-muted)]">검색결과가 없습니다</Text>
					</div>
				}
			/>
			<FloatingArea>
				<RandomMailButton />
				<OrderToggleButton />
			</FloatingArea>
		</VStack>
	);
}

export default MailList;
