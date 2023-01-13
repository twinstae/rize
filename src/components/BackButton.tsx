import React from 'react';

import useNavigation from '../router/useNavigation';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import { useHotkeys } from 'react-hotkeys-hook';
import { strs, useTranslation } from '../i18n/i18n';

function BackButton({ direction = 'bottom', width='fit', className='' }: { direction?: 'bottom' | 'top', width?: 'full' | 'fit', className?: string}) {
  const navigation = useNavigation();
  const { t } = useTranslation();

  function backHandler(){
    navigation.goBack();
  }
  useHotkeys('backspace', backHandler, [navigation])
  return (
    <IconButtonWithTooltip
      className={`tooltip-${direction} w-${width} ${className}`}
      icon={<ArrowLeftIcon />}
      onClick={backHandler}
      aria-label={t(strs.돌아가기)}
    />
  );
}

export default BackButton;
