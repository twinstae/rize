import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";
import { ThemeWrapper } from "../theme/useTheme";
import { DependenciesWrapper, useDependencies } from "./Dependencies";

//1. 사용할 의존성의 타입을 Dependencies 파일에 있는 DependencyT에 추가하고

function TestComponent() {
  //2. 의존성을 사용하는 컴포넌트에서 useDependencies로 가져오고
  const { navigate } = useDependencies();

  return <button onClick={() => navigate("test")}>테스트버튼</button>;
}

describe("DependeciesWrapper", () => {
  it(`제공한 의존성을 컴포넌트에서 사용할 수 있다`, () => {
    const mockFn = vi.fn();
    // 3. 컴포넌트를 render할 때 의존성을 제공한 DependenciesWrapper로 감싸준다
    render(<TestComponent />, {
      wrapper: DependenciesWrapper({ navigate: mockFn }),
    });

    fireEvent.click(screen.getByText("테스트버튼"));

    // 컴포넌트에서 넘긴 test 값으로 호출된다.
    expect(mockFn).toHaveBeenCalledWith("test");
  });
});
