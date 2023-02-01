import React from 'react';

import { rem } from '../theme/rem';
import MailListItem from './MailListItem';
import { useMailList } from '../hooks/Dependencies';
import { modes } from '../mailList/mailListModel';
import { FloatingArea, VirtualList, Text, VStack } from './rize-ui-web';
import useOrder from '../config/useOrder';
import OrderToggleButton from './OrderToggleButton';
import { getItem } from '../utils';

interface Props {
	index: number;
}

const height = window.innerHeight - rem(6);

function MailList({ index }: Props) {
	const result = useMailList().mailList(modes[index]);
	const { isReverse } = useOrder();

	return (
		<VStack className="relative">
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
						mail={getItem(isReverse, result, virtualItem.index)}
						index={virtualItem.index}
					/>
				)}
				fallback={
					<Text className="justify-center align-center text-2xl bg-base-100" role="alert">
						검색결과가 없습니다
					</Text>
				}
			/>
			<FloatingArea>
				<OrderToggleButton />
			</FloatingArea>
		</VStack>
	);
}

export default MailList;
