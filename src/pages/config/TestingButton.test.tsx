import React from 'react';

import paths from '../../router/paths';
import { useFakeNavigation } from '../../router/useNavigation';
import TestingButton from './TestingButton';
import { render } from '../../components/testUtil';


describe('TestingButton', () => {
  it('TestingButton을 클릭하면 Test 페이지로 이동한다', async () => {
    const { user, screen } = await render(<TestingButton />);
    const navigation = useFakeNavigation();
    await user.click(screen.getByLabelText('테스트'));

    expect(navigation.current()).toBe(paths.TEST);

    // cleanup
    navigation.goBack();
  });
});
