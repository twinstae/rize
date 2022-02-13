import { describe, it } from "vitest";
import TEST_PM_LIST from "../test/test_pm_list.json";
import { createUseMailList } from "./useMailList";
import { renderHook } from "@testing-library/react-hooks";
import { TestQueryWrapper } from "../hooks/QueryWrapper";

const fakeMailRepository: MailRepository = {
  getAllMailList: async () => TEST_PM_LIST as MailT[],
};

const useMailList = createUseMailList(fakeMailRepository);

describe("useMailList", () => {
  it("메일을 가져올 수 있다", async () => {
    const { result, waitFor } = renderHook(() => useMailList(), {
      wrapper: TestQueryWrapper,
    });

    expect(result.current.data).toEqual(undefined);

    await waitFor(() => result.current.isLoading === false);

    expect(result.current.data).toStrictEqual(TEST_PM_LIST);
  });
});
