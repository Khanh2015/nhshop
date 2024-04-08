import Categories from "@/pages/(website)/product/_components/CategoryList";
import { useProductQuery } from "@/common/hooks/useProductQuery";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../home/_components/Banner";
import ProductList from "./_components/ProductList";
import Services from "../home/_components/Services";

const ShopPage = () => {
    const [params] = useSearchParams();
    const page = params.get("page");

    const [limit, setLimit] = useState(10);
    const [curentPage, setCurentPage] = useState(page || 1);

    const { data, isLoading, refetch } = useProductQuery({
        _page: page,
        _limit: limit,
    });

    useEffect(() => {
        if (page && page !== curentPage) {
            setCurentPage(+page);
        }
    }, [page, curentPage]);

    const handleLimitChange = (event: ChangeEvent<any>) => {
        setLimit(event.target.value);
        refetch();
    };

    const { data: products, pagination } = data || { data: [], pagination: {} };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Banner title="Cửa hàng" subTitle="Shop" />
            <Categories />
            <>
                <div className="border-[3px] w-fit rounded px-4 py-2 ml-[90px] mt-10">
                    <label htmlFor="limit" className="font-semibold">
                        Show:
                    </label>
                    <select
                        id="limit"
                        className="font-semibold ml-2"
                        onChange={handleLimitChange}
                        defaultValue={limit}
                    >
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <ProductList products={products} pagination={pagination} />
            </>
            <Services />
        </div>
    );
};

export default ShopPage;
