import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Auth = () => {
    const { customer }: any = useAppSelector((state) => state.auth);
    if (customer?.customerId) {
        return <Navigate to="/dashboard" />;
    } else {
        return <Outlet />;
    }
};

export default Auth;
