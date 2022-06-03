import { renderHook } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';

import { createWrapper } from '../hooks/util';
import useRRDNavigation from './useRRDNavigation';

const renderNavigationHook = () =>
  renderHook(() => useRRDNavigation(), {
    wrapper: createWrapper(MemoryRouter, {}),
  });

describe('useNavigation 계약', () => {
  it('navigate하면 이동한다.', () => {
    const { result } = renderNavigationHook();

    result.current.navigate('/test');
    // ["/", "/test"]
    expect(result.current.current()).toBe('/test');
  });

  it('redirect하면 현재 history를 변경한다', () => {
    const { result } = renderNavigationHook();
    result.current.navigate('/test');
    result.current.redirect('/rabbit');
    // ["/", "/rabbit"]
    expect(result.current.current()).toBe('/rabbit');
  });

  it('goBack을 하면 한 번 뒤로 돌아간다', () => {
    const { result } = renderNavigationHook();
    result.current.navigate('/first');
    result.current.navigate('/second');
    result.current.goBack();
    // ["/"]
    expect(result.current.current()).toBe('/first');
  });
});
