import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { DependenciesWrapper } from "../hooks/Dependencies";
import MailListItem from "./MailListItem";
import { TEST_MAIL } from "../test/fixtures";

function renderWithDependency(component: React.ReactElement) {
  let history = ["/"];
  const navigateMailDetail = (slug: string) => {
    history.push("mail/" + slug);
  };

  const result = render(component, {
    wrapper: DependenciesWrapper({
      navigateMailDetail,
      toNick: (member: IZONE) => "조구리",
    }),
  });
  return { ...result, history };
}

describe("MailListItem", () => {
  it(`MailListItem에는 제목, 별명, 미리보기, 시간이 있다`, () => {
    renderWithDependency(<MailListItem mail={TEST_MAIL} />);

    screen.getByText(TEST_MAIL.subject);
    screen.getByText("조구리");
    screen.getByText(TEST_MAIL.preview);
    screen.getByText(TEST_MAIL.time);
  });

  it(`MailListItem을 클릭하면 id 에 해당하는 메일 상세 페이지로 이동한다`, () => {
    const { history } = renderWithDependency(<MailListItem mail={TEST_MAIL} />);

    fireEvent.click(screen.getByText(TEST_MAIL.subject));

    expect(history).toEqual(["/", "mail/" + TEST_MAIL.id]);
  });
});
