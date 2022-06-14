import { ChakraProvider } from '@chakra-ui/provider';
import theme from '@chakra-ui/theme';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { createWrapper } from '../hooks/util';
import { strs } from '../i18n/i18n';
import MailListPage from './MailListPage';

describe('MailListPage', () => {
  it('탭을 누르면 해당하는 아이템이 필터링된다', async () => {
    render(<MailListPage />, {
      wrapper: createWrapper(ChakraProvider, { theme }),
    });

    const tabUnread = screen.getByText(new RegExp(strs.읽지_않음));
    await userEvent.click(tabUnread);
    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(0);
    });

    const tabFavorite = screen.getByText(new RegExp(strs.중요));
    await userEvent.click(tabFavorite);
    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(0);
    });

    const tabAll = screen.getByText(new RegExp(strs.전체));
    await userEvent.click(tabAll);
    await waitFor(() => {
      expect(screen.getAllByRole('listitem').length).toBe(10);
    });

  });
});
