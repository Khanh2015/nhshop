import useCart from "@/common/hooks/useCart";
import { IProductCart } from "@/common/types/cart";
import Banner from "../home/_components/Banner";
import Services from "../home/_components/Services";

const CartPage = () => {
    const { data, isLoading, mutate, caculateTotal } = useCart();
    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            <Banner title="Giỏ hàng" subTitle="Cart" />
            <div className="mx-[90px] my-16 grid grid-cols-[3fr_1fr] gap-5">
                <div className="">
                    <table className=" w-full mx-auto">
                        <thead>
                            <tr className="bg-[#F9F1E7]">
                                <th className="p-4 text-left"></th>
                                <th className="p-4 text-left">Product</th>
                                <th className="p-4 text-left">Price</th>
                                <th className="p-4 text-left">Quantity</th>
                                <th className="p-4 text-left">Subtotal</th>
                                <th className="p-4 text-left"></th>
                            </tr>
                        </thead>
                        <br />
                        <br />
                        <tbody className="">
                            {data?.products?.map(
                                (product: IProductCart, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-4">
                                                <img
                                                    src={product.image}
                                                    alt=""
                                                    className="w-[105px] rounded-[20px]"
                                                />
                                            </td>
                                            <td className="p-4">
                                                {product.name}
                                            </td>
                                            <td className="p-4">
                                                ${product.price}
                                            </td>
                                            <td className="p-4">
                                                <i
                                                    onClick={() =>
                                                        mutate({
                                                            action: "DECREMENT",
                                                            productId:
                                                                product.productId,
                                                        })
                                                    }
                                                    className="fa-solid fa-minus bg-red-400 text-white p-2"
                                                ></i>
                                                <span className="inline-block w-10 text-center">
                                                    {product.quantity}
                                                </span>
                                                <i
                                                    onClick={() =>
                                                        mutate({
                                                            action: "INCREMENT",
                                                            productId:
                                                                product.productId,
                                                        })
                                                    }
                                                    className="fa-solid fa-plus bg-green-400 text-white p-2"
                                                ></i>
                                            </td>
                                            <td className="p-4">
                                                $
                                                {product.price *
                                                    product.quantity}
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() =>
                                                        mutate({
                                                            action: "REMOVE",
                                                            productId:
                                                                product.productId,
                                                        })
                                                    }
                                                    className="text-[#CCB49F] text-2xl"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="">
                    <div className="bg-[#F9F1E7] p-[12px_48px_60px]">
                        <h1 className="text-center text-[32px] font-semibold">
                            Cart Totals
                        </h1>
                        <div className="mt-12 flex items-center justify-between">
                            <p className="font-medium">Subtotal</p>
                            <p className="text-[#9F9F9F]">${caculateTotal()}</p>
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                            <p className="font-medium">Total</p>
                            <p className="text-[#B88E2F] text-xl">
                                ${caculateTotal()}
                            </p>
                        </div>
                        <button className="w-[222px] mx-auto rounded-[15px] border border-black py-4 text-xl mt-10 duration-200 hover:bg-black hover:text-white">
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
            <Services />
        </>
    );
};

export default CartPage;
