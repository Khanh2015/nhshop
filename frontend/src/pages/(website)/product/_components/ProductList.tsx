import { useLocalStorage } from "@/common/hooks/useStorage";
import { IProduct } from "@/common/types/product";
import { addToCart } from "@/services/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useToast } from "../../../../components/ui/use-toast";
import Pagination from "../../../../components/Pagination";

type ProductListProps = {
    products?: IProduct[];
    pagination?: {
        curentPage: number;
        totalPages: number;
        totalItem: number;
    };
};

const ProductList = ({ products, pagination }: ProductListProps) => {
    const { totalPages } = pagination || { totalPages: 1 };
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;

    const { mutate } = useMutation({
        mutationFn: ({
            productId,
            quantity,
        }: {
            productId: string;
            quantity: number;
        }) => addToCart({ userId, productId, quantity }),
        onSuccess: () => {
            toast({
                title: "Thêm vào giỏ hàng thành công",
                variant: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["CART", userId] });
        },
    });

    return (
        <div className="mx-[90px] mt-8 ">
            <div className="grid grid-cols-4 gap-6">
                {products?.map((product: IProduct, index: number) => {
                    return (
                        <div
                            key={index}
                            className="parent bg-[#F4F5F7] relative group"
                        >
                            <Link to={`/products/${product._id}`}>
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-[300px] object-cover duration-300 group-hover:scale-105"
                                    />
                                    {product.discount ? (
                                        <span className="w-12 h-12 rounded-full bg-[#E97171] flex items-center justify-center font-medium text-white absolute top-4 right-4">
                                            {product.discount + "%"}
                                        </span>
                                    ) : (
                                        <span className="w-12 h-12 rounded-full bg-[#2EC1AC] flex items-center justify-center font-medium text-white absolute top-4 right-4">
                                            New
                                        </span>
                                    )}
                                </div>
                            </Link>

                            <div className="p-[12px_12px_18px]">
                                <Link to={`/products/${product._id}`}>
                                    <h2 className="text-2xl font-semibold">
                                        {product.name}
                                    </h2>
                                </Link>
                                <p className=" text-[#898989] mt-1">
                                    {product?.category?.name}
                                </p>
                                <div className="mt-1 flex items-center justify-between">
                                    <p className="text-xl font-semibold">
                                        ${product.price}
                                    </p>
                                    {product.discount ? (
                                        <p className="line-through text-lg font-medium text-gray-500">
                                            $
                                            {(
                                                product.price +
                                                product.price *
                                                    (product.discount / 100)
                                            ).toFixed(2)}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="childrent w-full h-full absolute top-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 duration-300 group-hover:opacity-100">
                                <button
                                    onClick={() =>
                                        mutate({
                                            productId: product._id as string,
                                            quantity: 1,
                                        })
                                    }
                                    className="px-7 py-2 bg-white font-semibold text-lg"
                                >
                                    Add to cart
                                </button>
                                <Link
                                    to={`/products/${product._id}`}
                                    className="px-7 py-2 bg-white font-semibold text-lg"
                                >
                                    View details
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination totalPages={totalPages} />
        </div>
    );
};

export default ProductList;
