import { useProductQuery } from "@/common/hooks/useProductQuery";
import { IProduct } from "@/common/types/product";
import Banner from "./_components/Banner";
import ProductList from "../product/_components/ProductList";
import Shop from "./_components/Shop";
import Blog from "./_components/Blog";
import Services from "./_components/Services";
const HomePage = () => {
    const { data } = useProductQuery({ _limit: 6 });
    const featuredProducts = data?.data?.filter(
        (product: IProduct) => product.featured === true,
    );
    return (
        <>
            <Banner title="Trang chủ" subTitle="Home" />
            <div className="mx-[90px] mt-10 border-b-[1px] border-b-black pb-10">
                <h1 className="text-[40px] font-medium">New</h1>
            </div>
            <ProductList products={featuredProducts} />
            <div className="border-t-[1px] border-t-black mx-[90px] mt-16"></div>
            <Shop />
            <Blog />
            <Services />
        </>
    );
};

export default HomePage;
