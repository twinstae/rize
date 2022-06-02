import React from 'react'
import { Box, FormLabel, Input, VStack } from '@chakra-ui/react'
import useUsername from '../../config/useUsername'
import ConfigHeading from './ConfigHeading'

function NickNameConfig() {
  const {before, after, setBefore, setAfter, replaceUsername} = useUsername()

  return (
    <VStack align="stretch">
      <ConfigHeading title="닉네임 바꾸기"/>
      <FormLabel>
        <Input value={before} onChange={(e) => setBefore(e.target.value)} />에서
      </FormLabel>
      <FormLabel>
        <Input value={after} onChange={(e) => setAfter(e.target.value)} />으로
      </FormLabel>
      <Box>
        예시: {replaceUsername(`안녕 ${before}, 오늘도 화이팅!`)}
      </Box>
    </VStack>
  )
}

export default NickNameConfig