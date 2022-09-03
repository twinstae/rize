import { ArrowBackIcon } from '@chakra-ui/icons';
import React from 'react';

import useNavigation from '../router/useNavigation';
import IconButtonWithTooltip from './IconButtonWithTooltip';

function BackButton({ direction = 'bottom' }: { direction?: 'bottom' | 'top'}) {
  const navigation = useNavigation();

  return (
    <IconButtonWithTooltip
      className={`tooltip-${direction}`}
      icon={<ArrowBackIcon />}
      onClick={() => navigation.goBack()}
      aria-label="돌아가기"
    />
  );
}

export default BackButton;
