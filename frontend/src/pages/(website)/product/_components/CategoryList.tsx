import { ICategory } from "@/common/types/category";
import { getAllCategories } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Categories = () => {
    const { data } = useQuery({
        queryKey: ["CATEGORY_LIST"],
        queryFn: () => getAllCategories(),
        staleTime: 1000 * 60,
    });

    return (
        <section className="categories mt-10 mx-[90px]">
            <h1 className="text-[40px] font-medium">Categories</h1>
            <div className="mt-5 border-t-[1px] border-t-black pt-10 grid grid-cols-4 gap-6 place-items-center">
                {data?.map((category: ICategory) => (
                    <div key={category._id} className="">
                        <h3 className="font-semibold text-xl duration-200 px-3 py-2 hover:bg-black hover:text-white">
                            <Link to={`/categories/${category._id}`}>
                                {category.name}
                            </Link>
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
