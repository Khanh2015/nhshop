import Pagination from "@/components/Pagination";
import { useToast } from "@/components/ui/use-toast";
import { useProductQuery } from "@/common/hooks/useProductQuery";
import { ProductQueryType } from "@/common/types/product";
import { deleteProduct } from "@/services/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ProductManagement = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const [params] = useSearchParams();
    const page = params.get("page");

    const [curentPage, setCurentPage] = useState(page || 1);

    const { data, isLoading } = useProductQuery({
        _page: page,
        _limit: 4,
    });

    useEffect(() => {
        if (page && page !== curentPage) {
            setCurentPage(+page);
        }
    }, [page, curentPage]);

    const { data: products, pagination } = data || { data: [], pagination: {} };

    const { mutate } = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["PRODUCT_KEY"],
            });
            toast({
                title: "Product deleted successfully",
                variant: "success",
            });
        },
    });

    const handleDelete = (id: string) => {
        const check = confirm("Are you sure you want to delete this product?");
        if (check) {
            mutate(id);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Discount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Featured
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Count in stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(
                            (product: ProductQueryType, index: number) => {
                                return (
                                    <tr
                                        key={index}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <td className="p-4">{index + 1}</td>
                                        <td className="p-4 max-w-[150px] text-black font-bold">
                                            {product?.name}
                                        </td>
                                        <td className="p-4">
                                            <img
                                                className="max-w-[100px]"
                                                src={product?.image}
                                            />
                                        </td>
                                        <td className="p-4 max-w-[200px]">
                                            {product?.description.slice(0, 20)}
                                            ...
                                        </td>
                                        <td className="p-4">
                                            {product?.category?.name}
                                        </td>
                                        <td className="p-4">
                                            {product?.price}
                                        </td>
                                        <td className="p-4">
                                            {product?.discount}
                                        </td>
                                        <td className="p-4">
                                            {product?.featured ? "Yes" : "No"}
                                        </td>
                                        <td className="p-4">
                                            {product?.countInStock}
                                        </td>
                                        <td className="p-4">
                                            <Link
                                                to={`${product?._id}/edit`}
                                                className="text-lg font-bold text-blue-600 dark:text-blue-500 hover:underline mr-5"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        product?._id as string,
                                                    )
                                                }
                                                className="text-lg font-bold text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination flex justify-center items-center mt-10">
                <Pagination totalPages={pagination.totalPages} />
            </div>
        </div>
    );
};

export default ProductManagement;
