import { useFakeNavigation } from './useNavigation';

describe('useNavigation 계약', () => {
  const navigation = useFakeNavigation();
  it('navigate하면 이동한다.', () => {
    navigation.navigate('/test');
    // ["/", "/test"]
    expect(navigation.current()).toBe('/test');
  });

  it('redirect하면 현재 history를 변경한다', () => {
    navigation.redirect('/rabbit');
    // ["/", "/rabbit"]
    expect(navigation.current()).toBe('/rabbit');
  });

  it('goBack을 하면 한 번 뒤로 돌아간다', () => {
    navigation.goBack();
    // ["/"]
    expect(navigation.current()).toBe('/');
  });
});
