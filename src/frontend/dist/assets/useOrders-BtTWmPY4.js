import { c as useQueryClient } from "./index-BH8qyL0M.js";
import { u as useActor, a as useQuery } from "./useActor-DLK9v9XA.js";
import { b as createActor } from "./Layout-BLXPJbtK.js";
function useMyOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["orders", "mine"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching
  });
}
function useOrder(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["order", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      return actor.getOrder(id);
    },
    enabled: !!actor && !isFetching && id !== void 0
  });
}
function useCreateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return {
    mutateAsync: async (input) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createOrder(input);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      return result;
    },
    isPending: false
  };
}
function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return {
    mutateAsync: async ({
      items,
      successUrl,
      cancelUrl
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
    isPending: false
  };
}
export {
  useCreateCheckoutSession as a,
  useOrder as b,
  useMyOrders as c,
  useCreateOrder as u
};
