import { useLocalStorage } from "@/common/hooks/useStorage";
import { ISignin } from "@/common/types/auth";
import { signin } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

type Inputs = {
    email: string;
    password: string;
};

const signinSchema = Joi.object({
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
});

const SigninPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [, setUser] = useLocalStorage("user", {});
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ISignin>({
        resolver: joiResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate } = useMutation({
        mutationFn: (user: ISignin) => signin(user),
        onSuccess: (data) => {
            toast({
                title: "Đăng nhập thành công",
                variant: "success",
            });
            setUser(data);
            setTimeout(() => {
                navigate("/");
            }, 10);
        },
        onError: (error: any) => {
            if (error?.response?.data?.messages[0] === "Email không tồn tại") {
                setError("email", {
                    type: "manual",
                    message: "Email chưa được đăng ký",
                });
            }

            if (
                error?.response?.data?.messages[0] ===
                "Mật khẩu không chính xác"
            ) {
                setError("password", {
                    type: "manual",
                    message: "Mật khẩu không chính xác",
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
                Login
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

                <button className="text-xl font-bold bg-[#F9F1E7] w-[150px] mx-auto py-4 rounded-[15px] mt-5">
                    Login
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

export default SigninPage;
