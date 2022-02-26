import { fireEvent, render, screen } from "@testing-library/react";
import { describe } from "vitest";
import i18n from "../i18n/i18n";
import en from "../i18n/en.json";

import { RawDarkModeButton } from "./DarkModeButton";
import { Dependencies } from "../hooks/Dependencies";
import { useState } from "react";
describe("DarkModeButton", () => {
  const renderComponent = (t: (text: string) => string) => {
    return render(<RawDarkModeButton t={t} />, {
      wrapper: ({ children }) => {
        const [isDark, setDark] = useState(false);

        return (
          <Dependencies.Provider
            value={{
              isDark,
              toggleDark: () => setDark((prev) => !prev),
            }}
          >
            {children}
          </Dependencies.Provider>
        );
      },
    });
  };

  it(`DarkModeButton을 클릭하면 밝게에서 다크로 변한다`, () => {
    renderComponent((text) => text);

    fireEvent.click(screen.getByText("밝게"));
    fireEvent.click(screen.getByText("다크"));

    screen.getByText("밝게");
  });

  it(`DarkModeButton을 영어로 번역할 수 있다`, async () => {
    await i18n.changeLanguage("en");
    renderComponent(i18n.t);

    fireEvent.click(screen.getByText(en.translation.밝게));
    fireEvent.click(screen.getByText(en.translation.다크));

    screen.getByText(en.translation.밝게);
  });
});
