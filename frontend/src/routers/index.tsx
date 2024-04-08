import SigninPage from "@/pages/(auth)/signin";
import SignupPage from "@/pages/(auth)/signup";
import AboutPage from "@/pages/(website)/about/page";
import CartPage from "@/pages/(website)/cart/page";
import ContactPage from "@/pages/(website)/contact/page";
import HomePage from "@/pages/(website)/home/page";
import OrderPage from "@/pages/(website)/order/page";
import CategoryDetailPage from "@/pages/(website)/product/category/detail/page";
import DetailProduct from "@/pages/(website)/product/detail/page";
import ShopPage from "@/pages/(website)/product/page";
import LayoutWebsite from "@/pages/layout";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductManagement from "@/pages/(dashboard)/product";
import AddProductPage from "@/pages/(dashboard)/product/add";
import EditProductPage from "@/pages/(dashboard)/product/edit";
import NotFound from "@/pages/(website)/404/page";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="products/:id" element={<DetailProduct />} />
                    <Route
                        path="categories/:id"
                        element={<CategoryDetailPage />}
                    />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/order" element={<OrderPage />} />
                </Route>
                <Route
                    path="/admin"
                    element={
                        <PrivateRouter>
                            <LayoutAdmin />
                        </PrivateRouter>
                    }
                >
                    <Route index element={<Navigate to="products" />} />
                    <Route path="products">
                        <Route index element={<ProductManagement />} />
                        <Route path="add" element={<AddProductPage />} />
                        <Route path=":id/edit" element={<EditProductPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default Router;
