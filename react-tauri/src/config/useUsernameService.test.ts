import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { DependenciesWrapper } from "../hooks/Dependencies";
import fakeStorageRepo from "./fakeStorageRepo";
import useUsernameService from "./useUsernameService";

fakeStorageRepo.setItem({
  username: ["<위즈원>", "wiz*one"]
})

const renderUseUsernameService = () => {
  return renderHook(() => useUsernameService(), {
    wrapper: DependenciesWrapper({
      storageRepo: fakeStorageRepo
    })
  });
};

describe("useUsernameService", () => {
  it("사용자 이름을 가져올 수 있다", async () => {
    const { result } = renderUseUsernameService();

    await waitFor(() => {  
      expect(result.current.before).toBe("<위즈원>");
      expect(result.current.after).toBe("wiz*one");
    });
  });

  it("사용자 이름으로 주어진 text를 replace 할 수 있다", async () => {
    const { result } = renderUseUsernameService();

    await waitFor(() => {  
      expect(result.current.replaceUsername("<위즈원> 행복해")).toBe(
        "wiz*one 행복해"
      );
    });    
  });

  it("사용자 이름을 바꿀 수 있다", async () => {
    const { result } = renderUseUsernameService();

    result.current.setAfter("토끼");

    await waitFor(() => {
      expect(result.current.after).toBe("토끼");
    })
  });
});
