import axios from "axios";
import { setAuthToken } from "../auth-slice";
import { devInstance } from "../devInstance";
import { store } from "..";
import { toast } from "react-toastify";

const loginCustomer = async (customerData: any) => {
    try {
        console.log(customerData, "esfesvsefdv");
        const formData = new FormData();
        formData.append("username", customerData.username);
        formData.append("password", customerData.password);
        const resp = await devInstance.post(
            "/security/login/customer",
            formData
        );
        console.log(resp, "response");
        if (resp?.data?.success === true) {
            const res = await devInstance.get(
                `/security/customer/username/${customerData?.username}`
            );
            return res.data;
        }
    } catch (err: any) {
        if (err.response.data.msgCode === "INVALID_CREDENTIALS") {
            toast.error("Invalid Username or Password");
        } else {
            toast.error("Error");
            console.log(err, "error msessage");
        }
    }
};
const loginUser = async (userData: object) => {
    console.log(userData, "fcserfvsfdvsfg");
    const data = new FormData();
    data.append("username", "apiuser-asset");
    data.append("password", "DLMApi123@aSseT");

    const res: any = await devInstance.post(
        "/security/request/access-token",
        data
    );

    console.log(res, "response response");
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

const loginLocal = async (userData: object) => {
    const res = await devInstance.post(
        "https://apps.dlm.group/ASSETMGTAPI/api/v1/Authentication/LoginUser",
        userData
    );
    console.log(res);
    return res?.data?.data?.token;
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

export const getProfileInfo = async (id: number) => {
    const res = await devInstance.get(
        `Transaction/GetCustomerOnboardingDetails/${id}`
    );
    return res.data;
};

export const getbankInfo = async (id: number, local: any) => {
    const res = await axios.get(
        `https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/GetBankInfo/${id}`,
        {
            headers: {
                Authorization: `Bearer ${local}`,
            },
        }
    );
    return res.data;
};

export const getKycInfo = async (id: number, local: any) => {
    const res = await axios.get(
        `https://apps.dlm.group/ASSETMGTAPI/api/v1/Transaction/GetKycDocuments/${id}`,
        {
            headers: {
                Authorization: `Bearer ${local}`,
            },
        }
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
    loginLocal,
};

export default authService;
