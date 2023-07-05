import { devInstance } from "../devInstance";

const createCashAccount = async (data: any) => {
    console.log(data, "esfesvsefdv");
    const res = await devInstance.post(
        "/finance/cash-transaction/create",
        data
    );
    console.log(res);
    return res.data;
};

const postCashAccount = async (id: any) => {
    console.log(id, "awefafradf");
    const res = await devInstance.put(
        `/finance/cash-transaction/post/id/${id}`
    );
    console.log(res);
    return res.data;
};

const createInvestment = async (data: any) => {
    const res = await devInstance.post("/order/terminstrument/submit", data);
    console.log(res);
    return res.data;
};

const postInvestment = async (id: any) => {
    const res = await devInstance.put(`/order/terminstrument/post/${id}`);
    console.log(res);
    return res.data;
};

export { createCashAccount, postCashAccount, createInvestment, postInvestment };
