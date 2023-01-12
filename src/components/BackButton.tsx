import { ArrowBackIcon } from '@chakra-ui/icons';
import React from 'react';

import useNavigation from '../router/useNavigation';
import IconButtonWithTooltip from './IconButtonWithTooltip';

function BackButton({ direction = 'bottom', width='fit', className='' }: { direction?: 'bottom' | 'top', width?: 'full' | 'fit', className?: string}) {
  const navigation = useNavigation();

  return (
    <IconButtonWithTooltip
      className={`tooltip-${direction} w-${width} ${className}`}
      icon={<ArrowBackIcon />}
      onClick={() => navigation.goBack()}
      aria-label="돌아가기"
    />
  );
}

export default BackButton;
