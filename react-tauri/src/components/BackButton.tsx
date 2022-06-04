import { ArrowBackIcon } from '@chakra-ui/icons';
import React from 'react';

import useNavigation from '../router/useNavigation';
import IconButtonWithTooltip from './IconButtonWithTooltip';

function BackButton() {
  const navigation = useNavigation();

  return (
    <IconButtonWithTooltip
      icon={<ArrowBackIcon />}
      onClick={() => navigation.goBack()}
      aria-label="돌아가기"
    />
  );
}

export default BackButton;
