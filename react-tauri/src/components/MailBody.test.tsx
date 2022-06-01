import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { DependenciesWrapper } from "../hooks/Dependencies";
import { DummyUsernameService } from "../test/fixtures";
import { MockImage } from "./Image";
import MailBody from "./MailBody";
import fsStorageRepo from "../config/fsStorageRepo";

function renderWithDependency(component: React.ReactElement) {
  return render(component, {
    wrapper: DependenciesWrapper({
      storageRepo: fsStorageRepo,
      Image: MockImage,
    }),
  });
}

const TEST_PATH = "img/mail/7/20210428/2e8279a2b7bb39309a585d8282aa81b5.jpeg";

describe("MailBody", () => {
  it(`MailBody는 메일 본문과 이미지를 분리해서 렌더링한다`, () => {
    renderWithDependency(
      <MailBody
        mailBody={{
          body: "첫 번째 {이미지} 두 번째",
          images: [TEST_PATH],
        }}
      />
    );

    screen.getByText("첫 번째");
    // MockImage는 앞에 image:를 붙여줌
    screen.getByText(TEST_PATH);
    screen.getByText("두 번째");
  });
});
