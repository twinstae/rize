import { useMutation, useQuery, useQueryClient } from "react-query";

function useConfig(repository: StorageRepository) {
  const query = useQuery<Record<string, any>, Error>("Config", async () => {
    const saved = await repository.getItem("config");
    if (saved) {
      return JSON.parse(saved);
    }
    return {};
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ key, value }: { key: string; value: any }) => {
      if (query.data) {
        return repository.setItem(
          "config",
          JSON.stringify({ ...query.data, [key]: value })
        );
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries("Config"),
    }
  );
  return {
    ...query,
    mutation,
  };
}

export default useConfig;
