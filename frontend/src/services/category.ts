import instance from "@/config/axios";

export const getAllCategories = async () => {
  try {
    const response = await instance.get("/categories");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCategoryDetail = async (id: string) => {
  try {
    const response = await instance.get("/categories/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
};
