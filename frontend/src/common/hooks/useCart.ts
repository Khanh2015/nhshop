import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useStorage";
import {
  decreaseQuantity,
  getCart,
  increaseQuantity,
  removeItemFromCart,
} from "@/services/cart";
import { reduce } from "lodash";

const useCart = () => {
  const queryClient = useQueryClient();

  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const { data, ...restQuery } = useQuery({
    queryKey: ["CART", userId],
    queryFn: () => getCart(userId),
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      action,
      productId,
    }: {
      action: string;
      productId: string;
    }) => {
      switch (action) {
        case "INCREMENT":
          await increaseQuantity({ productId, userId });
          break;

        case "DECREMENT":
          await decreaseQuantity({ productId, userId });
          break;

        case "REMOVE":
          await removeItemFromCart({ productId, userId });
          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CART", userId] });
    },
  });

  const caculateTotal = () => {
    if (!data || !data.products) return 0;
    return reduce(
      data.products,
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return {
    data,
    mutate,
    ...restQuery,
    caculateTotal,
  };
};

export default useCart;
