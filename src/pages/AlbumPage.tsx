import React from 'react';
import { useDependencies, useMailList } from '../hooks/Dependencies';
import { HStack, VirtualList, Text } from '../components/rize-ui-web';
import BackButton from '../components/BackButton';
import useNavigation from '../router/useNavigation';
import { toMailDetail } from '../router/paths';
import { rem } from '../theme/rem';
import AppBar from '../components/AppBar';
import LeftDrawler from '../components/LeftDrawer';

const height = window.innerHeight - rem(0.1);

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

	return (
		<LeftDrawler>
			<AppBar />
			<VirtualList
				result={result}
				width={window.innerWidth}
				height={height}
				estimateSize={() => window.innerWidth / 4}
				VirtualRowItem={({ virtualItem, style }) => (
					<HStack
						key={virtualItem.key}
						className="gap-1 p-0.5"
						style={style}
					>
						<Text className="absolute bottom-0 left-0 text-xs bg-base-100 rounded p-0.5 z-10">
							{result[virtualItem.index][0].time.slice(2, 10)}
						</Text>
						{result[virtualItem.index].map(({ image, mailId }, i) => (
							<Link
								key={`${mailId}-${i}`}
								to={toMailDetail(mailId)}
								aria-label={`${mailId} 메일로 이동`}
								className="focus:ring-3 w-1/4"
							>
								<Image
									style={{ borderRadius: '1rem', objectFit: 'cover', aspectRatio: '1/1' }}
									width={window.innerWidth / 4}
									path={image.replace(/\..+/, '_tmb.jpg')}
								/>
							</Link>
						))}
					</HStack>
				)}
				fallback={<Text>이미지가 없습니다</Text>}
			/>
			<BackButton direction="top" variant="primary" circle="circle" size="base" className="absolute bottom-2 right-4" />
		</LeftDrawler>
	);
}

export default AlbumPage;
