import { fireEvent, render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { ThemeWrapper } from "../hooks/useTheme";
import { RawDarkModeButton } from "./DarkModeButton";

describe("DarkModeButton", () => {
  it(`DarkModeButton을 클릭하면 컬러로 변한다`, () => {
    render(<RawDarkModeButton t={(text) => text} />, {
      wrapper: ThemeWrapper,
    });

    fireEvent.click(screen.getByText("다크"));
    fireEvent.click(screen.getByText("컬러"));

    screen.getByText("다크");
  });

  it(`DarkModeButton을 영어로 번역할 수 있다`, () => {
    const t = (text: string) => {
      if (text === "다크") return "Dark";
      if (text === "컬러") return "Color";
      return "이상한 값";
    };

    render(<RawDarkModeButton t={t} />, {
      wrapper: ThemeWrapper,
    });

    fireEvent.click(screen.getByText("Dark"));
    fireEvent.click(screen.getByText("Color"));

    screen.getByText("Dark");
  });
});
