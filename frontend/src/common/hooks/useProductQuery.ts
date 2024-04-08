import { getAllProducts, getProductById } from "@/services/product";
import { useQuery } from "@tanstack/react-query";

export const useProductQuery = (options?: any) => {
  const { data, ...rest } = useQuery({
    queryKey: ["PRODUCT_KEY", options],
    queryFn: async () =>
      options?.id
        ? await getProductById(options.id)
        : await getAllProducts(options),
  });

  return { data, ...rest };
};
