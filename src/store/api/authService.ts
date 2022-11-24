import { setAuthToken } from "../auth-slice";
import { devInstance } from "../devInstance";

const loginCustomer = async (customerData: object) => {
    const res = await devInstance.post(
        "/Authentication/CustomerLogin",
        customerData
    );
    if (res?.data) {
        localStorage.setItem("customer", JSON.stringify(res.data.details));
        console.log(res?.data?.details);
    }
    return res.data.details;
};

const loginUser = async (userData: object) => {
    const res = await devInstance.post("/Authentication/LoginUser", userData);
    // if (res?.data) {
        setAuthToken(res?.data?.data?.token);
        // localStorage.setItem("user", JSON.stringify(res.data.data));
    // }
    return res.data.data;
};

const authService = {
    loginCustomer,
    loginUser,
};

export default authService;
