import { fireEvent, render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { ThemeWrapper } from "../hooks/useTheme";
import i18n from "../i18n/i18n";
import en from "../i18n/en.json";

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

  it(`DarkModeButton을 영어로 번역할 수 있다`, async () => {
    await i18n.changeLanguage("en");

    render(<RawDarkModeButton t={i18n.t} />, {
      wrapper: ThemeWrapper,
    });

    fireEvent.click(screen.getByText(en.translation.다크));
    fireEvent.click(screen.getByText(en.translation.컬러));

    screen.getByText(en.translation.다크);
  });
});
