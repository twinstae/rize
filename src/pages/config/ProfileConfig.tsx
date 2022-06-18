import { FormLabel, HStack, Radio, RadioGroup,VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ProfileImage from '../../components/ProfileImage';
import useProfile from '../../config/useProfile';
import { MEMBER_LIST } from '../../constants';
import { shuffle } from '../../hooks/util';
import { strs } from '../../i18n/i18n';
import ConfigHeading from './ConfigHeading';

const shuffledIndex = shuffle([0,1,2,3,4,5,6,7,8,9,10,11]);

function ProfileConfig() {
  const { profile, setProfile, profileList } = useProfile();
  const { t } = useTranslation();
  
  return (
    <VStack align="stretch">
      <FormLabel htmlFor="profile-select">
        <ConfigHeading title={t(strs.프로필_바꾸기)} />
      </FormLabel>
      <VStack >
        <span>{`선택한 테마 : ${profile}`}</span>
        <HStack spacing="0.5">
          {MEMBER_LIST.slice(0,6).map(member => <ProfileImage key={member} member={member} size="md" theme={profile}/> )}
        </HStack>
        <HStack spacing="0.5">
          {MEMBER_LIST.slice(6).map(member => <ProfileImage key={member} member={member} size="md" theme={profile}/> )}
        </HStack>
      </VStack>
      
      <RadioGroup id="profile-select" value={profile} onChange={(selected) => {
        setProfile(selected as typeof profileList[number]);
      }}>
        {profileList.map(profileTheme => (
          <Radio value={profileTheme} p="1" key={profileTheme}>
            {profileTheme}
            {shuffledIndex.map((i)=>MEMBER_LIST[i]).slice(0,4)
              .map(member => <ProfileImage key={member} member={member} size="md" theme={profileTheme}/> )}
          </Radio>
        ))}
      </RadioGroup>
    </VStack>
  );
}

export default ProfileConfig;