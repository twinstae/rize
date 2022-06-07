import { HStack, Radio, RadioGroup,VStack } from '@chakra-ui/react';
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
      <ConfigHeading title={t(strs.프로필_바꾸기) + ' : ' + profile}/>
      <VStack>
        <HStack spacing="0.5">
          {MEMBER_LIST.slice(0,6).map(member => <ProfileImage key={member} member={member} size="md" theme={profile}/> )}
        </HStack>
        <HStack spacing="0.5">
          {MEMBER_LIST.slice(6).map(member => <ProfileImage key={member} member={member} size="md" theme={profile}/> )}
        </HStack>
      </VStack>
      
      <RadioGroup value={profile} onChange={(selected) => {
        setProfile(selected);
      }}>
        {profileList.map(profileTheme => (
          <Radio value={profileTheme} p="1" key={profileTheme}>
            <h4>{profileTheme}</h4>
            {shuffledIndex.map((i)=>MEMBER_LIST[i]).slice(0,7)
              .map(member => <ProfileImage key={member} member={member} size="md" theme={profileTheme}/> )}
          </Radio>
        ))}
      </RadioGroup>
    </VStack>
  );
}

export default ProfileConfig;