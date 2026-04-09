import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Order, OrderInput, ShoppingItem } from "../backend";
import { createActor } from "../backend";

export function useMyOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders", "mine"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOrder(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order | null>({
    queryKey: ["order", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getOrder(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useGuestOrders(email: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders", "guest", email],
    queryFn: async () => {
      if (!actor || !email) return [];
      return actor.getOrdersByGuestEmail(email);
    },
    enabled: !!actor && !isFetching && !!email,
  });
}

export function useCreateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return {
    mutateAsync: async (input: OrderInput): Promise<Order> => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createOrder(input);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      return result;
    },
    isPending: false,
  };
}

export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return {
    mutateAsync: async ({
      items,
      successUrl,
      cancelUrl,
    }: {
      items: ShoppingItem[];
      successUrl: string;
      cancelUrl: string;
    }): Promise<string> => {
      if (!actor) throw new Error("Not connected");
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
    isPending: false,
  };
}

export function useStripeSessionStatus(sessionId: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stripe-session", sessionId],
    queryFn: async () => {
      if (!actor || !sessionId) return null;
      return actor.getStripeSessionStatus(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
    refetchInterval: 3000,
  });
}
