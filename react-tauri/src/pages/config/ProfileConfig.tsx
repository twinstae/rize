import { Radio, RadioGroup,VStack } from '@chakra-ui/react';
import { t } from 'i18next';
import React from 'react';
import { withTranslation } from 'react-i18next';

import ProfileImage from '../../components/ProfileImage';
import useProfile from '../../config/useProfile';
import { MEMBER_LIST } from '../../constants';
import { shuffle } from '../../hooks/util';
import { strs } from '../../i18n/i18n';
import ConfigHeading from './ConfigHeading';

const shuffledIndex = shuffle([0,1,2,3,4,5,6,7,8,9,10,11]);

function ProfileConfig() {
  const { profile, setProfile, profileList } = useProfile();
  return (
    <VStack align="stretch">
      <ConfigHeading title={t(strs.프로필_바꾸기)}/>
      <RadioGroup value={profile} onChange={(selected) => {
        setProfile(selected);
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

export default withTranslation()(ProfileConfig);