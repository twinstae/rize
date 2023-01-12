import React from 'react';

import paths from '../../router/paths';
import useNavigation from '../../router/useNavigation';
import IconButtonWithTooltip from '../../components/IconButtonWithTooltip';
import CheckIcon from '../../components/icons/CheckIcon';

function TestingButton() {
  const { navigate } = useNavigation();

  return (
    <IconButtonWithTooltip aria-label="개발자용 테스트 페이지. 재미있는 거 없어요!"
      icon={<CheckIcon />}
      onClick={() => navigate(paths.TEST)}
    />
  );
}

export default TestingButton;
