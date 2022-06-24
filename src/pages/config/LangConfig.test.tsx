import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import en from '../../i18n/en.json';
import ko from '../../i18n/ko.json';
import LangConfig from './LangConfig';



describe('LangConfig', () => {
  it('LangConfig에서 원하는 언어를 선택하면 언어 설정이 바뀐다', async () => {
    render(<LangConfig />);

    const langSelect = screen.getByRole('combobox', {
      name: new RegExp(ko.translation.언어)
    }) as HTMLSelectElement;

    userEvent.selectOptions(langSelect, 'en');

    expect(await screen.findByLabelText(new RegExp(en.translation.언어))).toBe(langSelect);

    userEvent.selectOptions(langSelect, 'ko');

    expect(await screen.findByLabelText(new RegExp(ko.translation.언어))).toBe(langSelect);
  });
});
