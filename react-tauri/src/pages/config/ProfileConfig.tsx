import React from 'react'
import { VStack, Radio, RadioGroup } from '@chakra-ui/react'
import ConfigHeading from './ConfigHeading'
import useProfile from '../../config/useProfile'
import { MEMBER_LIST } from '../../constants'
import ProfileImage from '../../components/ProfileImage'
import { shuffle } from '../../hooks/util'

const shuffledIndex = shuffle([0,1,2,3,4,5,6,7,8,9,10,11])

function ProfileConfig() {
  const { profile, setProfile, profileList } = useProfile()
  return (
    <VStack align="stretch">
      <ConfigHeading title="프로필 테마 바꾸기"/>
      <RadioGroup value={profile} onChange={(selected) => {
        setProfile(selected)
      }}>
        {profileList.map(profileTheme => (
          <Radio value={profileTheme} p="1">
            {profileTheme}
            {shuffledIndex.map((i)=>MEMBER_LIST[i]).slice(0,4).map(member => <ProfileImage member={member} size="md" theme={profileTheme}/> )}
          </Radio>
        ))}
      </RadioGroup>
    </VStack>
  )
}

export default ProfileConfig