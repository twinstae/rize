import React from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Tooltip, IconButton } from '@chakra-ui/react'
import { useDependencies } from '../hooks/Dependencies';


function BackButton() {
  const { navigation } = useDependencies();

  return (
    <Tooltip label="돌아가기">
      <IconButton
        variant="ghost"
        icon={<ArrowBackIcon />}
        onClick={() => navigation.goBack()}
        aria-label="돌아가기"
      />
    </Tooltip>
  )
}

export default BackButton