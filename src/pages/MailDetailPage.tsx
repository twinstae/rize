import React from 'react';

import BackButton from '../components/BackButton';
import FavoriteStar from '../components/FavoriteStar';
import MailBody from '../components/MailBody';
import ProfileImage from '../components/ProfileImage';
import useNavigation, { useSearchParam } from '../router/useNavigation';
import { useMailList } from '../hooks/Dependencies';
import invariant from '../invariant';
import { strs, useTranslation } from '../i18n/i18n';
import { toMailDetail } from '../router/paths';
import IconButtonWithTooltip from '../components/IconButtonWithTooltip';
import { VStack } from '../components/rize-ui';

function MailDetailPage() {
	const { t } = useTranslation();
	const [, setSearchParams] = useNavigation().useSearchParams();
	const mailId = useSearchParam('mailId');
	const toOriginalName = useMailList().useToOriginalName();
	invariant(mailId);
	const mail = useMailList().useMailById(mailId);
	invariant(mail);
	const currentMailList = useMailList().useCurrentMailList();

	const curretMailIndex = currentMailList.indexOf(mail);
	const nextMail = currentMailList[curretMailIndex + 1];

	return (
		<div className="w-full h-screen relative bg-base-100">
			<div className="p-1 h-full overflow-y-auto">
				<header className="p-4 relative">
					<FavoriteStar mailId={mail.id} />
					<ProfileImage member={mail.member} size="base" className="mr-2" />
					<strong>{toOriginalName(mail.member)} </strong>
					<span className="text-gray-500 absolute top-0 right-10">{mail.time}</span>
					<h3 className="p-0 m-0 overflow-hidden text-ellipsis font-bold">{mail.subject}</h3>
				</header>
				<MailBody mailBody={mail} />
				{nextMail && (
					<a
						href={toMailDetail(nextMail.id)}
						onClick={(e) => {
							e.preventDefault();
							setSearchParams(
								new URLSearchParams({
									mailId: nextMail.id,
								}),
							);
						}}
						className="btn btn-primary btn-sm"
					>
						{t(strs.다음_메일_보기)}
					</a>
				)}
			</div>
			<VStack className="fixed bottom-2 right-2 gap-2">
				<IconButtonWithTooltip
					aria-label="파파고 번역"
					as="a"
					variant="primary"
					circle="circle"
					size="base"
					direction="left"
					href={encodeURI('https://papago.naver.com/?sk=ja&tk=ko&hn=0&st='+mail.bodyText)}
					target="_blank"
					icon={<img src="https://papago.naver.com/e3bff6deb50f078fe094f764fac152e8.png" />}
				/>
				<BackButton direction="left" variant="primary" circle="circle" />
			</VStack>
		</div>
	);
}

export default MailDetailPage;
