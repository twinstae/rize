import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';

import fakeStorageRepo from '../config/fakeStorageRepo';
import { MEMBER_LIST } from '../constants';
import { DependenciesWrapper } from '../hooks/Dependencies';
import fakeMailRepository from '../mailList/fakeMailRepository';
import { createUseMailList } from '../mailList/useMailList';
import MemberList from './MemberList';
import { MockImage } from './TauriImage';

describe('MemberList', () => {
  describe('멤버를 클릭하면, 그 멤버의 태그가 선택된다', () => {
    MEMBER_LIST.forEach((name) => {
      it(`${name} 클릭하면 ${name} 태그가 선택된다`, () => {
        let nowTag = '';
        const setTag = (tag: string) => {
          nowTag = tag;
        };

        const useMailList = createUseMailList(fakeMailRepository);

        render(<MemberList />, {
          wrapper: DependenciesWrapper({
            storageRepo: fakeStorageRepo,
            tag: nowTag,
            setTag,
            Image: MockImage,
            useMailList
          }),
        });

        fireEvent.click(screen.getByText(name));

        expect(nowTag).toBe(name);
      });
    });
  });
});
