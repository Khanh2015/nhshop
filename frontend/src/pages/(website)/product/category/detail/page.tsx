import { getCategoryDetail } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProductList from "../../_components/ProductList";

const CategoryDetailPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["CATEGORY_DETAIL"],
        queryFn: () => getCategoryDetail(id as string),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <section className="categories mt-10 mx-[90px]">
            <h1 className="text-[40px] font-medium">
                Category {data?.category?.name}
            </h1>
            <div className="mt-5 border-t-[1px] border-t-black pt-10"></div>
            <ProductList products={data?.products} />
        </section>
    );
};

export default CategoryDetailPage;
