import React from 'react';

import ko from '../i18n/ko.json';
import paths from '../router/paths';
import { useFakeNavigation } from '../router/useNavigation';
import BackButton from './BackButton';
import { render } from './testUtil';

describe('BackButton', () => {
  it('클릭하면 뒤로 돌아간다', async () => {
    const navigation = useFakeNavigation();
    navigation.navigate(paths.CONFIG);
    expect(navigation.current()).toBe(paths.CONFIG);

    const { user, screen } = await render(<BackButton />);

    await user.click(screen.getByLabelText(ko.translation.돌아가기));
    expect(navigation.current()).toBe(paths.ROOT);
  });
});
