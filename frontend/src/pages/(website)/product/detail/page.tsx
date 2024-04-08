import { useProductQuery } from "@/common/hooks/useProductQuery";
import { IProduct } from "@/common/types/product";
import { getRelatedProducts } from "@/services/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProductList from "../_components/ProductList";
import { addToCart } from "@/services/cart";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/common/hooks/useStorage";

const DetailProduct = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data: product, isLoading, isError } = useProductQuery({ id: id! });

    const { data } = useQuery({
        queryKey: ["RELATED_PRODUCTS", product?.category._id],
        queryFn: async () => {
            const data = await getRelatedProducts(product.category._id, id!);
            return data;
        },
    });

    const relatedProducts = data?.filter(
        (item: IProduct) => item._id !== product._id,
    );

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

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return (
        <div>
            <div className="flex items-center gap-5 px-[90px] py-7 bg-[#F9F1E7]">
                <span className="text-[#9F9F9F]">Home</span>
                <span className="font-bold text-lg">
                    {" "}
                    <i className="fa-solid fa-angle-right"></i>{" "}
                </span>
                <span className="text-[#9F9F9F]">Shop</span>
                <span className="font-bold text-lg">
                    {" "}
                    <i className="fa-solid fa-angle-right"></i>{" "}
                </span>
                <span className="font-bold text-lg"> | </span>
                <span className="font-semibold text-lg">{product.name}</span>
            </div>
            <div className="mx-[90px] mt-20 grid grid-cols-2">
                <div className="flex gap-8">
                    <div className="flex flex-col gap-8">
                        {product.gallery.map((item: string, index: number) => (
                            <img
                                key={index}
                                src={item}
                                alt=""
                                className="w-[80px] h-[80px] rounded-lg"
                            />
                        ))}
                    </div>
                    <div className="">
                        <img
                            src={product.image}
                            alt=""
                            className="w-[500px] rounded-lg"
                        />
                    </div>
                </div>
                <div className="">
                    <h1 className="text-[42px]">{product.name}</h1>
                    <h2 className="text-[24px] text-[#9F9F9F] font-medium">
                        ${product.price}
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <i className="fa-solid fa-star text-yellow-500"></i>
                            <i className="fa-solid fa-star text-yellow-500"></i>
                            <i className="fa-solid fa-star text-yellow-500"></i>
                            <i className="fa-solid fa-star text-yellow-500"></i>
                            <i className="fa-solid fa-star text-yellow-500"></i>
                        </div>
                        <div className="text-[#9F9F9F]">|</div>
                        <p className="text-[#9F9F9F]">5 Customer Review</p>
                    </div>
                    <p className="">
                        {product.description} Setting the bar as one of the
                        loudest speakers in its class, the Kilburn is a compact,
                        stout-hearted hero with a well-balanced audio which
                        boasts a clear midrange and extended highs for a sound.
                    </p>
                    <form action="" className="mt-5">
                        <span className="text-[#9F9F9F]">Size</span>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="">
                                <label
                                    htmlFor="sizel"
                                    className="w-[30px] h-[30px] rounded-md bg-[#B88E2F] text-white inline-block text-center"
                                >
                                    L
                                </label>
                                <input
                                    name="size"
                                    hidden
                                    type="radio"
                                    id="sizel"
                                />
                            </div>
                            <div className="">
                                <label
                                    htmlFor="sizel"
                                    className="w-[30px] h-[30px] rounded-md bg-[#F9F1E7] inline-block text-center"
                                >
                                    XL
                                </label>
                                <input
                                    name="size"
                                    hidden
                                    type="radio"
                                    id="sizel"
                                />
                            </div>
                            <div className="">
                                <label
                                    htmlFor="sizel"
                                    className="w-[30px] h-[30px] rounded-md bg-[#F9F1E7] inline-block text-center"
                                >
                                    XS
                                </label>
                                <input
                                    name="size"
                                    hidden
                                    type="radio"
                                    id="sizel"
                                />
                            </div>
                        </div>

                        <span className="text-[#9F9F9F] mt-5 block">Color</span>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="">
                                <label
                                    htmlFor="blue"
                                    className="w-[30px] h-[30px] rounded-full bg-[#816DFA] inline-block"
                                ></label>
                                <input
                                    name="color"
                                    hidden
                                    type="radio"
                                    id="blue"
                                />
                            </div>
                            <div className="">
                                <label
                                    htmlFor="black"
                                    className="w-[30px] h-[30px] rounded-full bg-black inline-block"
                                ></label>
                                <input
                                    name="color"
                                    hidden
                                    type="radio"
                                    id="black"
                                />
                            </div>
                            <div className="">
                                <label
                                    htmlFor="brown"
                                    className="w-[30px] h-[30px] rounded-full bg-[#B88E2F] inline-block"
                                ></label>
                                <input
                                    name="color"
                                    hidden
                                    type="radio"
                                    id="brown"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-5">
                            <div className="border border-gray-500 inline-block rounded-lg">
                                <span className="px-4 py-5 inline-block">
                                    <i className="fa-solid fa-minus"></i>
                                </span>
                                <span className="px-4 py-5 inline-block">
                                    1
                                </span>
                                <span className="px-4 py-5 inline-block">
                                    <i className="fa-solid fa-plus"></i>
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    mutate({
                                        productId: product._id as string,
                                        quantity: 1,
                                    })
                                }
                                className="text-xl px-9 py-4 border border-black rounded-xl font-medium duration-200 hover:bg-black hover:text-white"
                            >
                                Add To Cart
                            </button>

                            <button className="text-xl px-9 py-4 border border-black rounded-xl font-medium duration-200 hover:bg-black hover:text-white">
                                + Compare
                            </button>
                        </div>
                    </form>
                    <div className="mt-16">
                        <hr />
                    </div>
                    <div className="mt-10 flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <p className="text-[#9F9F9F] w-20">SKU</p>
                            <p className="text-[#9F9F9F]">:</p>
                            <p className="text-[#9F9F9F]">SS001</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-[#9F9F9F] w-20">Category</p>
                            <p className="text-[#9F9F9F]">:</p>
                            <p className="text-[#9F9F9F]">
                                {product.category.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-[#9F9F9F] w-20">Tags</p>
                            <p className="text-[#9F9F9F]">:</p>
                            <p className="text-[#9F9F9F]">
                                Sofa, Chair, Home, Shop
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-[#9F9F9F] w-20">Share</p>
                            <p className="text-[#9F9F9F]">:</p>
                            <div className="flex items-center gap-5">
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-linkedin"></i>
                                <i className="fa-brands fa-twitter"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-14">
                <hr />
            </div>
            <div className="m-[70px_90px]">
                <div className="flex items-center justify-center gap-20">
                    <h2 className="text-2xl font-medium">Description</h2>
                    <h2 className="text-2xl text-[#9F9F9F]">
                        Additional Information
                    </h2>
                    <h2 className="text-2xl text-[#9F9F9F]">Reviews [5]</h2>
                </div>
                <div className="mt-14 mx-[110px]">
                    <p className="text-[#9F9F9F]">
                        Embodying the raw, wayward spirit of rock ‘n’ roll, the
                        Kilburn portable active stereo speaker takes the
                        unmistakable look and sound of Marshall, unplugs the
                        chords, and takes the show on the road.
                    </p>
                    <p className="text-[#9F9F9F] mt-10">
                        Weighing in under 7 pounds, the Kilburn is a lightweight
                        piece of vintage styled engineering. Setting the bar as
                        one of the loudest speakers in its class, the Kilburn is
                        a compact, stout-hearted hero with a well-balanced audio
                        which boasts a clear midrange and extended highs for a
                        sound that is both articulate and pronounced. The
                        analogue knobs allow you to fine tune the controls to
                        your personal preferences while the guitar-influenced
                        leather strap enables easy and stylish travel.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-5 mt-10">
                    <div className="">
                        <img
                            src="https://picsum.photos/700/400"
                            alt=""
                            className="rounded-xl w-full"
                        />
                    </div>
                    <div className="">
                        <img
                            src="https://picsum.photos/700/400"
                            alt=""
                            className="rounded-xl w-full"
                        />
                    </div>
                </div>
            </div>
            <div>
                <hr />
                <h3 className="text-center text-[36px] font-medium mt-20">
                    Related products
                </h3>
                <ProductList products={relatedProducts} />
            </div>
        </div>
    );
};

export default DetailProduct;
