import { setAuthToken } from "../auth-slice";
import { devInstance } from "../devInstance";

const loginCustomer = async (customerData: object) => {
    const res = await devInstance.post(
        "/Authentication/CustomerLogin",
        customerData
    );
    if (res?.data) {
        localStorage.setItem("customer", JSON.stringify(res?.data?.details));
        console.log(res?.data?.details);
    }
    return res.data.details;
};

const loginUser = async (userData: object) => {
    const res = await devInstance.post("/Authentication/LoginUser", userData);
    if (res?.data) {
        setAuthToken(res?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
    }
    return res.data.data;
};

const forgottenPassword = async (customerEmail: string) => {
    await devInstance.post("/Authentication/ForgotPassword", {
        email: customerEmail,
    });
};

const confirmCustomer = async (state: any) => {
    const res = await devInstance.post("/Authentication/ConfirmEmail", state);
    return res;
};

const registerCustomer = async (customer: object) => {
    const res = await devInstance.post(
        "/Authentication/CustomerSignUp",
        customer
    );

    return res.data.data || res.data.result;
};

const resendOtp = async (customerEmail: string) => {
    const res = await devInstance.post(
        `/Authentication/resendOtp/${customerEmail}`
    );
    return res;
};

const updatePassword = async (customerDetails: object) => {
    const res = await devInstance.patch(
        "/Authentication/UpdatePassword",
        customerDetails
    );
    return res.data;
};

const resetPassword = async (customerDetails: object) => {
    const res = await devInstance.patch(
        "/Authentication/ResetPassword",
        customerDetails
    );
    return res.data;
};

const authService = {
    loginCustomer,
    loginUser,
    forgottenPassword,
    registerCustomer,
    confirmCustomer,
    resendOtp,
    updatePassword,
    resetPassword
};

export default authService;
