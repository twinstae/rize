import React from 'react';
import { useDependencies, useMailList } from '../hooks/Dependencies';
import { HStack, VirtualList, Text } from '../components/rize-ui-web';
import BackButton from '../components/BackButton';
import useNavigation from '../router/useNavigation';
import { toMailDetail } from '../router/paths';
import { rem } from '../theme/rem';
import AppBar from '../components/AppBar';
import LeftDrawler from '../components/LeftDrawer';

const height = window.innerHeight - rem(7.5);

function chunk<T>(arr: Array<T>, count: number): Array<Array<T>> {
	const result = [];
	for (let i = 0; i < arr.length; i += count) {
		result.push(arr.slice(i, i + count));
	}
	return result;
}

function AlbumPage() {
	const { Image } = useDependencies();
	const [mode] = useMailList().useCurrentMode();
	const mailList = useMailList().mailList(mode);
	const { Link } = useNavigation();

	const result = chunk(
		mailList.flatMap((mail) => mail.images.map((image) => ({ image, mailId: mail.id, time: mail.time }))),
		4,
	);

	const cellSize = (window.innerWidth - 40) / 4;

	return (
		<LeftDrawler>
			<AppBar />
			<VirtualList
				result={result}
				width={window.innerWidth}
				height={height}
				estimateSize={() => cellSize + 8}
				VirtualRowItem={({ virtualItem, style }) => (
					<HStack key={virtualItem.key} className="gap-2 px-3 py-1" style={style}>
						{result[virtualItem.index].map(({ image, mailId, time }, i) => (
							<Link
								key={`${mailId}-${i}`}
								to={toMailDetail(mailId)}
								aria-label={`${mailId} 메일로 이동`}
								className="relative w-1/4 overflow-hidden rounded-2xl focus:ring-2 focus:ring-pink-400"
							>
								<Image
									style={{ objectFit: 'cover', aspectRatio: '1/1', width: '100%' }}
									width={cellSize}
									path={image.replace(/\..+/, '_tmb.jpg')}
								/>
								<span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 pb-1.5 pt-6 text-[10px] font-medium tabular-nums text-white">
									{time.slice(2, 10)}
								</span>
							</Link>
						))}
					</HStack>
				)}
				fallback={
					<div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
						<span className="text-3xl">🖼️</span>
						<Text className="text-sm font-medium text-[var(--rize-muted)]">이미지가 없습니다</Text>
					</div>
				}
			/>
			<BackButton direction="top" variant="primary" circle="circle" size="base" className="absolute bottom-6 right-4" />
		</LeftDrawler>
	);
}

export default AlbumPage;
