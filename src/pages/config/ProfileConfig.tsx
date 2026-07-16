import React from 'react';
import { FormLabel, HStack, Radio, VStack } from '../../components/rize-ui-web';
import { useTranslation } from '../../i18n/i18n';

import ProfileImage from '../../components/ProfileImage';
import useProfile from '../../config/useProfile';
import { MEMBER_LIST } from '../../constants';
import { strs } from '../../i18n/i18n';
import invariant from '../../invariant';
import ConfigCard from './ConfigCard';

function ThemeRadio({ theme }: { theme: string }) {
	const { profile, setProfile } = useProfile();
	return (
		<FormLabel className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-[var(--rize-border)] p-4 transition hover:bg-[var(--rize-surface)] has-[:checked]:border-pink-300 has-[:checked]:bg-[var(--rize-primary-soft)]">
			<HStack className="w-full items-center gap-3">
				<Radio
					value={theme}
					id={`${theme}-radio`}
					name="theme"
					onChange={(e) => {
						invariant(e.currentTarget.checked);
						setProfile(theme);
					}}
					checked={profile === theme}
				/>
				<span className="text-sm font-semibold text-[var(--rize-text)]">{theme}</span>
			</HStack>
			<HStack className="flex-wrap gap-2">
				{MEMBER_LIST.map((member) => (
					<ProfileImage
						key={member}
						member={member}
						size="md"
						theme={theme}
						className="h-10 w-10 border border-white object-cover shadow-sm"
					/>
				))}
			</HStack>
		</FormLabel>
	);
}

function ProfileConfig() {
	const { profile, profileList } = useProfile();
	const { t } = useTranslation();

	return (
		<ConfigCard title={t(strs.프로필_바꾸기)}>
			<p className="text-sm text-[var(--rize-muted)]">
				{t(strs.선택한_테마)} : <span className="font-semibold text-[var(--rize-text)]">{profile}</span>
			</p>
			<div className="grid grid-cols-6 gap-2">
				{MEMBER_LIST.map((member) => (
					<ProfileImage
						key={member}
						member={member}
						size="base"
						theme={profile}
						className="h-11 w-11 border-2 border-white object-cover shadow-sm"
					/>
				))}
			</div>

			<VStack className="gap-3">
				{profileList.map((theme) => (
					<ThemeRadio key={theme} theme={theme} />
				))}
			</VStack>
		</ConfigCard>
	);
}

export default ProfileConfig;
