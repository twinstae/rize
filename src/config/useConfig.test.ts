import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import fakeStorageRepo from './fakeStorageRepo';
import useConfig from './useConfig';

fakeStorageRepo.setItem({ test: '테스트' });

const renderFakeConfig = () => renderHook(() => useConfig());

describe('useConfig', () => {
  it('config를 가져올 수 있다', async () => {
    const { result } = renderFakeConfig();

    await waitFor(() => expect(result.current.get('test')).toBe('테스트'), {
      interval: 5,
      timeout: 20,
    });
  });

  it('config를 수정할 수 있다', async () => {
    const { result } = renderFakeConfig();

    result.current.set('test', '아이즈원');

    await waitFor(() => expect(result.current.get('test')).toBe('아이즈원'), {
      interval: 5,
      timeout: 20,
    });
  });
});
// fallback
// loaded
