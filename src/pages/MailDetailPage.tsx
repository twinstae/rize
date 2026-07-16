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
import { Button } from '../components/rize-ui-web';
import { Fab, FabButton, FabList, FabToggleButton } from '../components/Fab';
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
	const formattedDate = new Intl.DateTimeFormat(lang, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}).format(date);

	return (
		<div className="relative h-screen w-full bg-base-100">
			<div className="h-full overflow-y-auto pb-28">
				<header className="border-b border-[var(--rize-border)] px-5 pb-4 pt-5">
					<div className="flex items-start gap-3">
						<ProfileImage
							member={mail.member}
							size="base"
							className="h-12 w-12 shrink-0 border-2 border-white object-cover shadow-sm"
						/>
						<div className="min-w-0 flex-1">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0">
									<p className="text-base font-bold text-[var(--rize-text)]">
										{toOriginalName(mail.member)}
									</p>
									<time
										className="mt-0.5 block text-xs text-[var(--rize-muted)]"
										dateTime={date.toISOString()}
									>
										<abbr aria-label={formattedDate}>{mail.time}</abbr>
									</time>
								</div>
								<FavoriteStar mailId={mail.id} inline />
							</div>
							<h1 className="mail-subject mt-3 text-[var(--rize-text)]">{mail.subject}</h1>
						</div>
					</div>
				</header>
				<div className="px-5 py-4">
					<MailBody mailBody={mail} />
				</div>
				{nextMail && (
					<div className="px-5 pb-6">
						<Button as={Link} to={toMailDetail(nextMail.id)} className="w-full">
							{t(strs.다음_메일_보기)}
						</Button>
					</div>
				)}
			</div>
			<Fab>
				<FabToggleButton ariaLabel={t(strs.메뉴)} />
				<FabList side="top">
					<RandomMailButton fab direction="top" />
					<FabButton
						direction="top"
						size="base"
						ariaLabel={t(strs.파파고_번역하기)}
						href={encodeURI(
							`https://papago.naver.com/?sk=ja&tk=${lang}&hn=0&st=${mail.bodyText}`,
						)}
						target="_blank"
						rel="noreferrer"
						icon={
							<img
								src="https://papago.naver.com/e3bff6deb50f078fe094f764fac152e8.png"
								alt=""
								className="h-6 w-6 rounded-full"
							/>
						}
					/>
					<BackButton fab direction="top" size="base" />
				</FabList>
			</Fab>
		</div>
	);
}

export default MailDetailPage;
