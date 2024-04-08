import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { ISignup } from "@/common/types/auth";
import { signup } from "@/services/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
};

const signupSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Tên không được để trống",
        "string.empty": "Tên không được để trống",
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Email không đúng định dạng",
            "any.required": "Email không được để trống",
            "string.empty": "Email không được để trống",
        }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Mật khẩu phải lớn hơn 6 ký tự",
        "any.required": "Mật khẩu không được để trống",
        "string.empty": "Mật khẩu không được để trống",
    }),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
            "any.required": "Mật khẩu xác nhận không được để trống",
            "any.only": "Mật khẩu xác nhận không khớp",
            "string.empty": "Mật khẩu xác nhận không được để trống",
        }),
});

const SignupPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [, setUser] = useLocalStorage("user", {});
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ISignup>({
        resolver: joiResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: (user: ISignup) => signup(user),
        onSuccess: (data) => {
            toast({
                title: "Đăng ký thành công",
                variant: "success",
            });
            setUser(data);
            navigate("/signin");
        },
        onError: (error: any) => {
            if (error?.response?.data?.message === "Email đã tồn tại") {
                setError("email", {
                    type: "manual",
                    message: "Email đã được đăng ký",
                });
            }
        },
    });

    const onSubmit = (data: Inputs) => {
        mutate(data);
    };

    return (
        <div className="my-20">
            <h1 className="text-center text-3xl font-bold text-[#B88E2F]">
                Sign up
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[600px] flex flex-col gap-3 mt-5 mx-auto"
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor=""
                        className="text-[#B88E2F] text-[22px] font-"
                    >
                        Username:
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        className="w-full h-[60px] rounded-[15px] border border-black outline-none px-3 "
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor=""
                        className="text-[#B88E2F] text-[22px] font-"
                    >
                        Email:
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        className="w-full h-[60px] rounded-[15px] border border-black outline-none px-3 "
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor=""
                        className="text-[#B88E2F] text-[22px] font-"
                    >
                        Password:
                    </label>
                    <input
                        {...register("password")}
                        type="password"
                        className="w-full h-[60px] rounded-[15px] border border-black outline-none px-3 "
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor=""
                        className="text-[#B88E2F] text-[22px] font-"
                    >
                        Confirm Password:
                    </label>
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        className="w-full h-[60px] rounded-[15px] border border-black outline-none px-3 "
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <button className="text-xl font-bold bg-[#F9F1E7] w-[150px] mx-auto py-4 rounded-[15px] mt-5">
                    Sign up
                </button>
            </form>

            <div className="w-[600px] flex items-center justify-around mt-5 mx-auto">
                <button className="px-6 py-4 bg-[#0171D3] text-white text-xl font-bold rounded-[15px]">
                    <i className="fa-brands fa-facebook"></i> Facebook
                </button>

                <button className="px-6 py-4 border-[2px] border-black text-xl font-bold rounded-[15px]">
                    <i className="fa-brands fa-google"></i> Google
                </button>
            </div>
        </div>
    );
};

export default SignupPage;
