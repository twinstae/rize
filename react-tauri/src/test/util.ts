import { waitFor } from "@testing-library/react";

interface QueryMutationResult {
  current: {
    isSuccess: boolean;
    mutation: {
      isLoading: boolean;
    };
  };
}

export async function waitForMutation(result: QueryMutationResult) {
  // mutate가 시작될 때까지 대기
  await waitFor(() => result.current.mutation.isLoading === true);
  // mutate가 끝날 때까지 대기
  await waitFor(() => result.current.mutation.isLoading === false);
  // invalidate한 쿼리가 다시 올 때까지 대기
  await waitFor(() => result.current.isSuccess);
  return;
}
