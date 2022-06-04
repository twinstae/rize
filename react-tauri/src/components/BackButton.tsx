import { ArrowBackIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';

import useNavigation from '../router/useNavigation';

function BackButton() {
  const navigation = useNavigation();

  return (
    <Tooltip label="돌아가기">
      <IconButton
        variant="ghost"
        icon={<ArrowBackIcon />}
        onClick={() => navigation.goBack()}
        aria-label="돌아가기"
      />
    </Tooltip>
  );
}

export default BackButton;
