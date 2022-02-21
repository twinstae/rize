import React from "react";
import { describe, it } from "vitest";
import TEST_PM_LIST from "../test/test_pm_list.json";
import TEST_MAIL_BODY_DICT from "../test/test_mail_body_dict.json";
import { createUseMailList } from "./useMailList";
import { TestQueryWrapper } from "../hooks/QueryWrapper";
import fakeMailRepository from "./fakeMailRepository";
import { createWrapper, pipeWrapper, SuspenseWrapper } from "../hooks/util";
import { render, waitFor } from "@testing-library/react";

const useMailList = createUseMailList(fakeMailRepository);

function Data() {
  const query = useMailList().mailList;
  return (
    <span>{JSON.stringify(query.data ? query.data[0] : "데이터 없음")}</span>
  );
}

describe("useMailList", () => {
  it("메일 리스트를 가져올 수 있다", async () => {
    const { queryByText } = render(<Data />, {
      wrapper: pipeWrapper(TestQueryWrapper, SuspenseWrapper),
    });

    waitFor(() => queryByText("마지막 프메라니"));
  });

  it("메일을 id로 가져올 수 있다", async () => {
    const { queryByText } = render(<Data />, {
      wrapper: pipeWrapper(TestQueryWrapper, SuspenseWrapper),
    });

    waitFor(() => queryByText("<p>마지막&nbsp;프메라니..</p>"));
  });
});
