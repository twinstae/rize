import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { TestQueryWrapper } from "../hooks/QueryWrapper";
import { waitForMutation } from "../test/util";
import useConfig from "./useConfig";

interface FakeRepository extends StorageRepository {
  _storage: Record<string, string>;
}

const fakeStorageRepo: FakeRepository = {
  _storage: {},
  async getItem(key) {
    return this._storage[key];
  },
  async setItem(key, value: string) {
    this._storage[key] = value;
    return;
  },
};

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
