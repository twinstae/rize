import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import invariant from '../invariant';

import useNavigation, { useSearchParam } from '../router/useNavigation';
import { useMailList } from '../hooks/Dependencies';
import { strs, useTranslation } from '../i18n/i18n';
import { toMailDetail } from '../router/paths';
import useLang from '../config/useLang';
import useNextPrevMail from '../mailList/useNextPrevMail';

import BackButton from '../components/BackButton';
import FavoriteStar from '../components/FavoriteStar';
import MailBody from '../components/MailBody';
import ProfileImage from '../components/ProfileImage';
import IconButtonWithTooltip from '../components/IconButtonWithTooltip';
import { Button, VStack } from '../components/rize-ui-web';
import RandomMailButton from '../components/RandomMailButton';

function MailDetailPage() {
	const { t } = useTranslation();
	const { Link } = useNavigation();
	const mailId = useSearchParam('mailId');
	const toOriginalName = useMailList().useToOriginalName();
	invariant(mailId);
	const mail = useMailList().useMailById(mailId);
	invariant(mail);
	const { lang } = useLang();
	const { nextMail, goNext, goPrev } = useNextPrevMail(mailId);
	useHotkeys('j', () => goNext());
	useHotkeys('k', () => goPrev());
	
	const date = new Date(mail.time.replaceAll('/', '-').replace(' ', 'T'));
	return (
		<div className="w-full h-screen relative bg-base-100">
			<div className="p-1 h-full overflow-y-auto">
				<header className="p-4 relative">
					<FavoriteStar mailId={mail.id} />
					<ProfileImage member={mail.member} size="base" className="mr-2" />
					<strong>{toOriginalName(mail.member)} </strong>
					<time className="text-gray-500 w-fit" dateTime={date.toISOString()}>
						<abbr aria-label={new Intl.DateTimeFormat(lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date)}>
							{mail.time}
						</abbr>
					</time>
					<h3 className="p-0 m-0 overflow-hidden text-ellipsis font-bold">{mail.subject}</h3>
				</header>
				<MailBody mailBody={mail} />
				{nextMail && (
					<Button as={Link} to={toMailDetail(nextMail.id)}>
						{t(strs.다음_메일_보기)}
					</Button>
				)}
			</div>
			<VStack className="fixed bottom-2 right-2 gap-2">
				<RandomMailButton />
				<IconButtonWithTooltip
					ariaLabel={t(strs.파파고_번역하기)}
					as="a"
					variant="primary"
					circle="circle"
					size="base"
					direction="left"
					href={encodeURI(`https://papago.naver.com/?sk=ja&tk=${lang}&hn=0&st=${mail.bodyText}`)}
					target="_blank"
					icon={<img src="https://papago.naver.com/e3bff6deb50f078fe094f764fac152e8.png" />}
				/>
				<BackButton direction="left" variant="primary" circle="circle" size="base" />
			</VStack>
		</div>
	);
}

export default MailDetailPage;
