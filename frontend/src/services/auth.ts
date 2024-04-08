import instance from "@/config/axios";
import { ISignin, ISignup } from "@/common/types/auth";

export const signin = async (user: ISignin) => {
    try {
        const response = await instance.post("/auth/signin", user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signup = async (user: ISignup) => {
    try {
        const response = await instance.post("/auth/signup", user);
        return response.data;
    } catch (error) {
        throw error;
    }
};
