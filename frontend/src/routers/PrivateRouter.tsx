import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/common/hooks/useStorage";
import { Navigate } from "react-router-dom";

type PrivateRouterProps = {
    children: JSX.Element;
};

const PrivateRouter = (props: PrivateRouterProps) => {
    const { toast } = useToast();
    const [user] = useLocalStorage("user", {});
    if (user?.user?.role !== "admin") {
        toast({
            title: "You are not authorized to access this page",
            variant: "destructive",
        });
        return <Navigate to={"/signin"} />;
    }
    return props.children;
};

export default PrivateRouter;
