import { fireEvent, render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { ThemeWrapper } from "../theme/useTheme";
import { RawDarkModeButton } from "./DarkModeButton";

describe("DarkModeButton", () => {
  it(`DarkModeButton을 클릭하면 컬러로 변한다`, () => {
    render(<RawDarkModeButton />, {
      wrapper: ThemeWrapper,
    });

    fireEvent.click(screen.getByText("다크"));
    fireEvent.click(screen.getByText("컬러"));

    screen.getByText("다크");
  });
});
