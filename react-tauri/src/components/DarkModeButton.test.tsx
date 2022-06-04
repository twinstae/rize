import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { describe } from 'vitest';

import { Dependencies } from '../hooks/Dependencies';
import en from '../i18n/en.json';
import i18n from '../i18n/i18n';
import { RawDarkModeButton } from './DarkModeButton';


describe('DarkModeButton', () => {
  const renderComponent = () => {
    return render(<RawDarkModeButton />, {
      wrapper: ({ children }) => {
        const [isDark, setDark] = useState(false);

        return (
          <Dependencies.Provider
            value={{
              useColorMode: () => ({
                colorMode: isDark ? 'dark' : 'light',
                toggleColorMode: () => setDark((prev) => !prev),
              }),
            }}
          >
            {children}
          </Dependencies.Provider>
        );
      },
    });
  };

  it('DarkModeButton을 클릭하면 밝게에서 다크로 변한다', async () => {
    await i18n.changeLanguage('ko');
    renderComponent();

    fireEvent.click(screen.getByText('밝게'));
    fireEvent.click(screen.getByText('다크'));

    screen.getByText('밝게');
  });

  it('DarkModeButton을 영어로 번역할 수 있다', async () => {
    await i18n.changeLanguage('en');
    renderComponent();

    fireEvent.click(screen.getByText(en.translation.밝게));
    fireEvent.click(screen.getByText(en.translation.다크));

    screen.getByText(en.translation.밝게);
  });
});
