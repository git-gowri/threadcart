import { c as useQueryClient } from "./index-BH8qyL0M.js";
import { u as useActor, a as useQuery } from "./useActor-DLK9v9XA.js";
import { b as createActor } from "./Layout-BLXPJbtK.js";
function useSavedAddresses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["account", "addresses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSavedAddresses();
    },
    enabled: !!actor && !isFetching
  });
}
function useSaveAddress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return {
    mutateAsync: async (address) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.saveAddress(address);
      queryClient.invalidateQueries({ queryKey: ["account"] });
      return result;
    },
    isPending: false
  };
}
function useRemoveAddress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return {
    mutateAsync: async (index) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.removeAddress(index);
      queryClient.invalidateQueries({ queryKey: ["account"] });
      return result;
    },
    isPending: false
  };
}
export {
  useRemoveAddress as a,
  useSaveAddress as b,
  useSavedAddresses as u
};
