import { FormLabel, HStack, Radio, VStack } from '../../components/rize-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ProfileImage from '../../components/ProfileImage';
import useProfile from '../../config/useProfile';
import { profileList } from '../../config/useProfile';
import { MEMBER_LIST } from '../../constants';
import { shuffle } from '../../hooks/util';
import { strs } from '../../i18n/i18n';
import ConfigHeading from './ConfigHeading';

const shuffledIndex = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
const shuffledMembers = shuffledIndex.map((i) => MEMBER_LIST[i]).slice(0, 4);

function ThemeRadio({ theme }: { theme: typeof profileList[number] }) {
  const { setProfile } = useProfile();
  return (
    <FormLabel>
      {theme}
      <Radio value={theme} id={`${theme}-radio`} name="theme" onChange={(e) => {
        if (e.target.checked){
          setProfile(theme);
        }
      }} />
      {shuffledMembers.map((member) => (
        <ProfileImage key={member} member={member} size="md" theme={theme} />
      ))}
    </FormLabel>
    
  );
}

function ProfileConfig() {
  const { profile } = useProfile();
  const { t } = useTranslation();

  return (
    <VStack className="card bg-base-100 ring-1 ring-slate-300 shadow-xl p-4">
      <FormLabel htmlFor="profile-select">
        <ConfigHeading title={t(strs.프로필_바꾸기)} />
      </FormLabel>
      <VStack>
        <span>{`선택한 테마 : ${profile}`}</span>
        <HStack>
          {MEMBER_LIST.slice(0, 6).map((member) => (
            <ProfileImage
              key={member}
              member={member}
              size="md"
              theme={profile}
            />
          ))}
        </HStack>
        <HStack>
          {MEMBER_LIST.slice(6).map((member) => (
            <ProfileImage
              key={member}
              member={member}
              size="md"
              theme={profile}
            />
          ))}
        </HStack>
      </VStack>

      <div className="form-control"
        id="profile-select"
      >
        {profileList.map((theme) => (
          <ThemeRadio key={theme} theme={theme} />
        ))}
      </div>
    </VStack>
  );
}

export default ProfileConfig;
