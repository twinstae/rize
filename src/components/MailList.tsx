import React from 'react';

import { rem } from '../theme/rem';
import MailListItem from './MailListItem';
import { useMailList } from '../hooks/Dependencies';
import { modes } from '../mailList/mailListModel';
import { Button, FloatingArea, VirtualList, Text, VStack } from './rize-ui-web';
import useOrder from '../config/useOrder';
interface Props {
	index: number;
}

const height = window.innerHeight - rem(5.5);

function MailList({ index }: Props) {
	const result = useMailList().mailList(modes[index]);
	const { isReverse, toggle } = useOrder();

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
						mail={result[isReverse ? result.length - virtualItem.index - 1 : virtualItem.index]}
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
				<Button variant="primary" circle="circle" className="shadow-lg" onClick={() => {
					toggle();
				}}>
					{isReverse ? '오랜순' : '최신순'}
				</Button>
			</FloatingArea>
		</VStack>
	);
}

export default MailList;
