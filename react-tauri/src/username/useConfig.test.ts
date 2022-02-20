import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { TestQueryWrapper } from "../hooks/QueryWrapper";
import { waitForMutation } from "../test/util";
import fakeStorageRepo from "./fakeStorageRepo";
import useConfig from "./useConfig";

describe("useConfig", () => {
  it("config를 가져올 수 있다", async () => {
    fakeStorageRepo.setItem("config", `{ "test": "테스트" }`);

    const { result } = renderHook(() => useConfig(fakeStorageRepo), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toStrictEqual({ test: "테스트" });
  });

  it("config를 수정할 수 있다", async () => {
    const { result } = renderHook(() => useConfig(fakeStorageRepo), {
      wrapper: TestQueryWrapper,
    });

    result.current.mutation.mutate({ key: "test", value: "아이즈원" });

    await waitForMutation(result);

    expect(result.current.data).toStrictEqual({ test: "아이즈원" });
  });
});
