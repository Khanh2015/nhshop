import instance from "@/config/axios";
import { IProduct } from "@/common/types/product";

export const getAllProducts = async (params?: any) => {
    try {
        const response = await instance.get("/products", { params });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (id: string) => {
    try {
        const response = await instance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const addProduct = async (product: IProduct) => {
    try {
        const response = await instance.post(`/products`, product);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const response = await instance.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const editProduct = async (id: string, product: IProduct) => {
    try {
        const response = await instance.put(`/products/${id}`, product);
        return response.data;
    } catch (error) {
        return [];
    }
};

export const getRelatedProducts = async (category: string, id: string) => {
    try {
        const response = await instance.get(
            `/products/${category}/related/${id}`,
        );
        return response.data;
    } catch (error) {
        return error;
    }
};
