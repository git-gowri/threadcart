import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import type { Product, ProductFilter } from "../backend";
import { createActor } from "../backend";
import type { LocalProductFilter } from "../types";

function toBackendFilter(filter: LocalProductFilter): ProductFilter {
  return {
    category: filter.category,
    searchTerm: filter.searchTerm,
    minPrice:
      filter.minPrice !== undefined
        ? BigInt(Math.round(filter.minPrice * 100))
        : undefined,
    maxPrice:
      filter.maxPrice !== undefined
        ? BigInt(Math.round(filter.maxPrice * 100))
        : undefined,
    size: filter.size,
    color: filter.color,
  };
}

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useFilterProducts(filter: LocalProductFilter) {
  const { actor, isFetching } = useActor(createActor);
  const hasFilter = Object.values(filter).some(
    (v) => v !== undefined && v !== "",
  );
  return useQuery<Product[]>({
    queryKey: ["products", "filter", filter],
    queryFn: async () => {
      if (!actor) return [];
      if (!hasFilter) return actor.listProducts();
      return actor.filterProducts(toBackendFilter(filter));
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useProduct(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
    staleTime: 1000 * 60 * 5,
  });
}
