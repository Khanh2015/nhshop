import instance from "@/config/axios";

export const getCart = async (userId: string) => {
  try {
    const response = await instance.get("/carts/" + userId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (info: {
  userId: string;
  productId: string;
  quantity: number;
}) => {
  try {
    const response = await instance.post("/carts/add-to-cart", info);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const increaseQuantity = async (info: {
  productId: string;
  userId: string;
}) => {
  try {
    const response = await instance.post(`/carts/increase`, info);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const decreaseQuantity = async (info: {
  productId: string;
  userId: string;
}) => {
  try {
    const response = await instance.post(`/carts/decrease`, info);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeItemFromCart = async (info: {
  productId: string;
  userId: string;
}) => {
  try {
    const response = await instance.post(`/carts/remove-from-cart`, info);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
