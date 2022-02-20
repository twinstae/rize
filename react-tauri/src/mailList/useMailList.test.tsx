import { describe, it } from "vitest";
import TEST_PM_LIST from "../test/test_pm_list.json";
import TEST_MAIL_BODY_DICT from "../test/test_mail_body_dict.json";
import { createUseMailList } from "./useMailList";
import { renderHook } from "@testing-library/react-hooks";
import { TestQueryWrapper } from "../hooks/QueryWrapper";
import fakeMailRepository from "./fakeMailRepository";

const useMailList = createUseMailList(fakeMailRepository);

describe("useMailList", () => {
  it("메일 리스트를 가져올 수 있다", async () => {
    const { result, waitFor } = renderHook(() => useMailList().mailList, {
      wrapper: TestQueryWrapper,
    });

    expect(result.current.data).toEqual(undefined);

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toStrictEqual(TEST_PM_LIST);
  });

  it("메일을 id로 가져올 수 있다", async () => {
    const { result, waitFor } = renderHook(
      () => useMailList().mailById("m25731"),
      {
        wrapper: TestQueryWrapper,
      }
    );

    expect(result.current.data).toEqual(undefined);

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toStrictEqual(
      (TEST_MAIL_BODY_DICT as Record<string, MailBodyT>)["m25731"]
    );
  });
});
