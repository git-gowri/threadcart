import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ShippingAddress, UserAccount } from "../backend";
import { createActor } from "../backend";

export function useSavedAddresses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ShippingAddress[]>({
    queryKey: ["account", "addresses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSavedAddresses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveAddress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return {
    mutateAsync: async (address: ShippingAddress): Promise<UserAccount> => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.saveAddress(address);
      queryClient.invalidateQueries({ queryKey: ["account"] });
      return result;
    },
    isPending: false,
  };
}

export function useRemoveAddress() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return {
    mutateAsync: async (index: bigint): Promise<boolean> => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.removeAddress(index);
      queryClient.invalidateQueries({ queryKey: ["account"] });
      return result;
    },
    isPending: false,
  };
}
