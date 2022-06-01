import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { DependenciesWrapper } from "../hooks/Dependencies";
import fakeStorageRepo from "./fakeStorageRepo";
import useConfig from "./useConfig";

fakeStorageRepo.setItem({ test: "테스트" })

const renderFakeConfig = () => renderHook(() => useConfig(), {
  wrapper: DependenciesWrapper({
    storageRepo: fakeStorageRepo
  })
});

describe("useConfig", () => {
  it("config를 가져올 수 있다", async () => {
    const { result } = renderFakeConfig()

    await waitFor(() => 
      expect(result.current.get("test")).toBe("테스트")
    );
  });

  it("config를 수정할 수 있다", async () => {
    const { result } = renderFakeConfig()

    result.current.set("test", "아이즈원")

    await waitFor(() => 
      expect(result.current.get("test")).toBe("아이즈원")
    );
  });
});
// fallback
// loaded