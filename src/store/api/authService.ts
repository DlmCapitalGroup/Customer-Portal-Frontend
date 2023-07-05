import { setAuthToken } from "../auth-slice";
import { devInstance } from "../devInstance";

const loginCustomer = async (customerData: any) => {
    console.log(customerData, "esfesvsefdv");
    const res = await devInstance.get(
        `/security/customer/username/${customerData?.username || customerData?.portalUserName}`
    );
    return res.data;
};

const loginUser = async (userData: object) => {
    const res = await devInstance.post(
        "/security/request/access-token",
        userData
    );
    if (res?.data) {
        console.log(res?.data);
        console.log(res?.data.access_token);
        setAuthToken(res?.data?.access_token);
    }
    return res.data;
};
const loginAdmin = async (adminData: object) => {
    const res = await devInstance.post("/Admin/LoginAdmin", adminData);
    if (res?.data) {
        console.log(res?.data);
        // localStorage.setItem("user", JSON.stringify(res?.data?.data));
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
    const res = await devInstance.post("/partner/customer/create", customer);
    console.log(res, "response responsew gjhbhjbjkh");
    return res.data;
};

const resendOtp = async (customerEmail: string) => {
    const res = await devInstance.post(
        `/Authentication/resendOtp/${customerEmail}`
    );
    return res.data;
};

const updatePassword = async (customerDetails: object) => {
    const res = await devInstance.patch(
        "/Authentication/UpdatePassword",
        customerDetails
    );
    return res.data;
};

const resetPassword = async (customerDetails: object) => {
    const res = await devInstance.post(
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
    resetPassword,
    loginAdmin,
};

export default authService;
