import "./index-BH8qyL0M.js";
import { u as useActor, a as useQuery } from "./useActor-DLK9v9XA.js";
import { b as createActor } from "./Layout-BLXPJbtK.js";
function toBackendFilter(filter) {
  return {
    category: filter.category,
    searchTerm: filter.searchTerm,
    minPrice: filter.minPrice !== void 0 ? BigInt(Math.round(filter.minPrice * 100)) : void 0,
    maxPrice: filter.maxPrice !== void 0 ? BigInt(Math.round(filter.maxPrice * 100)) : void 0,
    size: filter.size,
    color: filter.color
  };
}
function useFilterProducts(filter) {
  const { actor, isFetching } = useActor(createActor);
  const hasFilter = Object.values(filter).some(
    (v) => v !== void 0 && v !== ""
  );
  return useQuery({
    queryKey: ["products", "filter", filter],
    queryFn: async () => {
      if (!actor) return [];
      if (!hasFilter) return actor.listProducts();
      return actor.filterProducts(toBackendFilter(filter));
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 2
  });
}
function useProduct(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== void 0,
    staleTime: 1e3 * 60 * 5
  });
}
export {
  useProduct as a,
  useFilterProducts as u
};
