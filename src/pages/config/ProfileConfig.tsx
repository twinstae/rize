import React from 'react';
import { FormLabel, HStack, Radio, VStack } from '../../components/rize-ui-web';
import { useTranslation } from '../../i18n/i18n';

import ProfileImage from '../../components/ProfileImage';
import useProfile from '../../config/useProfile';
import { MEMBER_LIST } from '../../constants';
import { shuffle } from '../../hooks/util';
import { strs } from '../../i18n/i18n';
import invariant from '../../invariant';
import ConfigCard from './ConfigCard';

const shuffledIndex = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
const shuffledMembers = shuffledIndex.map((i) => MEMBER_LIST[i]).slice(0, (window.innerWidth - 60 ) / 50);

function ThemeRadio({ theme }: { theme: string }) {
	const { profile, setProfile } = useProfile();
	return (
		<FormLabel className="flex flex-col">
			<HStack className="gap-2 justify-start w-full">
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
				<span className="text-lg">{theme}</span>
			</HStack>
			<HStack className="gap-2">
				{shuffledMembers.map((member) => (
					<ProfileImage key={member} member={member} size="md" theme={theme} />
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
			<VStack>
				{`${t(strs.선택한_테마)} : ${profile}`}
				<HStack className="justify-between">
					{MEMBER_LIST.slice(0, 6).map((member) => (
						<ProfileImage key={member} member={member} size="base" theme={profile} />
					))}
				</HStack>
				<HStack className="justify-between">
					{MEMBER_LIST.slice(6).map((member) => (
						<ProfileImage key={member} member={member} size="base" theme={profile} />
					))}
				</HStack>
			</VStack>

			{profileList.map((theme) => (
				<ThemeRadio key={theme} theme={theme} />
			))}
		</ConfigCard>
	);
}

export default ProfileConfig;
