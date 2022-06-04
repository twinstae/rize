import { CheckIcon } from '@chakra-ui/icons';
import { IconButton,Tooltip } from '@chakra-ui/react';
import React from 'react';

import paths from '../../router/paths';
import useNavigation from '../../router/useNavigation';

function TestingButton() {
  const { navigate } = useNavigation();

  return (
    <Tooltip label="개발자용 테스트 페이지. 재미있는 거 없어요!">
      <IconButton
        icon={<CheckIcon />}
        onClick={() => navigate(paths.TEST)}
        aria-label="테스트"
      />
    </Tooltip>
  );
}

export default TestingButton;
