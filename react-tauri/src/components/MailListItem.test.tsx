import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { DependenciesWrapper } from "../hooks/Dependencies";
import MailListItem from "./MailListItem";
import { DummyUsernameService, TEST_MAIL } from "../test/fixtures";
import { toMailDetail } from "../router/paths";
import { useFakeNavigation } from "../router/useNavigation";
import { MockImage } from "./Image";

function renderWithDependency(component: React.ReactElement) {
  const navigation = useFakeNavigation();

  const result = render(component, {
    wrapper: DependenciesWrapper({
      navigation,
      toNick: (member) => "조구리",
      usernameService: DummyUsernameService,
      Image: MockImage,
    }),
  });
  return { ...result, navigation };
}

describe("MailListItem", () => {
  it(`MailListItem에는 제목, 별명, 미리보기, 시간이 있다`, () => {
    renderWithDependency(<MailListItem mail={TEST_MAIL} style={{}} />);

    screen.getByText(TEST_MAIL.subject);
    screen.getByText("조구리");
    screen.getByText(TEST_MAIL.preview);
    screen.getByText(TEST_MAIL.time);
  });

  it(`MailListItem을 클릭하면 id 에 해당하는 메일 상세 페이지로 이동한다`, () => {
    const { navigation } = renderWithDependency(
      <MailListItem mail={TEST_MAIL} style={{}} />
    );

    fireEvent.click(screen.getByText(TEST_MAIL.subject));

    expect(navigation.current()).toBe(toMailDetail(TEST_MAIL.id));
  });
});
