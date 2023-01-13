
import React from 'react';
import { useDependencies, useMailList } from '../hooks/Dependencies';
import { HStack, VStack, VirtualList } from '../components/rize-ui';
import BackButton from '../components/BackButton';
import useNavigation from '../router/useNavigation';
import { toMailDetail } from '../router/paths';
import { rem } from '../theme/rem';

const height = window.innerHeight - rem(0.1);

function chunk<T>(arr: Array<T>, count: number): Array<Array<T>> {
  const result = [];
  for (let i = 0; i < arr.length; i+=count){
    result.push(arr.slice(i, i+count));
  }
  return result;
}

function AlbumPage() {
  const { Image } = useDependencies();
  const { all } = useMailList().mailList();
  const { Link } = useNavigation();
  
  const result = chunk(all.flatMap(mail => mail.images.map(image => ({ image, mailId: mail.id, time: mail.time }))), 4);

  return (
    <VStack className="relative bg-base-100">
      <BackButton direction="top" className="absolute bottom-2 right-4 btn-primary p-2 btn-circle"/>
      <VirtualList
        result={result}
        width={window.innerWidth}
        height={height}
        estimateSize={() => rem(8)}
        VirtualRowItem={({virtualItem}) => (
          <HStack key={virtualItem.key} className="gap-1 p-0.5"  style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualItem.size}px`,
            transform: `translateY(${virtualItem.start}px)`,
            gap: '0.25rem',
          }}>
            <span className="absolute bottom-0 left-0 text-xs bg-base-100 rounded p-0.5 z-10">{result[virtualItem.index][0].time.slice(2,10)}</span>
            {result[virtualItem.index].map(({image, mailId},i) => (
              <Link key={i} to={toMailDetail(mailId)} aria-label={mailId + ' 메일로 이동'} className="focus:ring-3">
                <Image style={{ borderRadius: '1rem', objectFit: 'cover', aspectRatio: '1/1' }} width={128} path={image.replace(/\..+/, '_tmb.jpg')} />
              </Link>
            ))}
          </HStack>
        )}
        fallback={<div>이미지가 없습니다</div>}
      />
    </VStack>
  );
}

export default AlbumPage;
