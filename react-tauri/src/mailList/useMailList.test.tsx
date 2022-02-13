import { describe, it } from "vitest";
import TEST_PM_LIST from "../test/test_pm_list.json";
import { createUseMailList } from "./useMailList";
import { renderHook, act } from "@testing-library/react-hooks";

const fakeMailRepository: MailRepository = {
  getAllMailList: async () => TEST_PM_LIST as MailT[],
};

const useMailList = createUseMailList(fakeMailRepository);

describe("useMailList", () => {
  it("메일을 가져올 수 있다", async () => {
    const { result, waitFor } = renderHook(() => useMailList());

    await waitFor(() => result.current.isLoading === false);

    expect(result.current.data).toStrictEqual(TEST_PM_LIST);
  });
});
