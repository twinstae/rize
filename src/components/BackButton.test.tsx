import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ko from '../i18n/ko.json';
import paths from '../router/paths';
import { useFakeNavigation } from '../router/useNavigation';
import BackButton from './BackButton';

describe('BackButton', () => {
  it('클릭하면 뒤로 돌아간다', () => {
    const navigation = useFakeNavigation();
    navigation.navigate(paths.CONFIG);
    expect(navigation.current()).toBe(paths.CONFIG);

    render(<BackButton />);

    fireEvent.click(screen.getByLabelText(ko.translation.돌아가기));
    expect(navigation.current()).toBe(paths.ROOT);
  });
});
