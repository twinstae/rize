import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';
import React from 'react';

// eslint-disable-next-line react/display-name
const IconButtonWithTooltip = (props: IconButtonProps) => {
  
  return (
    <Tooltip label={props['aria-label']}>
      <IconButton {...props} />
    </Tooltip>
  );
};

export default IconButtonWithTooltip;
