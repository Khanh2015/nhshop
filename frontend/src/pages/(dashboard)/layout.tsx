import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

const LayoutAdmin = () => {
    return (
        <div className="grid grid-cols-[17%_83%]">
            <AdminSidebar />
            <main>
                <AdminHeader />
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutAdmin;
