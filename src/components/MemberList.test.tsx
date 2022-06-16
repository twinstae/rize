import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { MEMBER_LIST } from '../constants';
import MemberList from './MemberList';
import SelectedTag from './SelectedTag';

describe('MemberList x SelectedTag', () => {
  describe('멤버를 클릭하면, 그 멤버의 태그가 선택된다', () => {
    MEMBER_LIST.forEach(name => {
      it(`${name} 클릭하면 ${name} 태그가 선택된다`, async () => {
        const Story = () => {
          return (
            <div>
              <SelectedTag />
              <MemberList />
            </div>
          );
        };

        render(<Story />);
        const theMember = screen.getByText(name);
        expect(theMember.getAttribute('aria-selected')).toBe('false');

        fireEvent.click(theMember);

        expect(screen.getByTestId('selected-tag')).toHaveTextContent(name);
        expect(theMember.getAttribute('aria-selected')).toBe('true');
      });
    });
  });
});
