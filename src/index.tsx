import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistor, store } from "./store";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./screens/AuthScreens/LoginScreen";
import Register from "./screens/AuthScreens/RegisterScreen";
import ConfirmEmail from "./screens/AuthScreens/ConfirmEmailScreen";
import DashboardScreen from "./screens/DashboardScreen";
import Transactions from "./screens/TransactionsScreen";
import FundWallet from "./screens/FundWallet";
import ForgotPassword from "./screens/AuthScreens/ForgotPasswordScreen";
import Plan from "./screens/PlanScreen";
import Library from "./screens/OurLibraryScreen";
import Support from "./screens/SupportScreen";
import Products from "./screens/OurLibraryScreen/ProductsScreen";
import Product from "./screens/OurLibraryScreen/ProductScreen";
import NewsPostScreen from "./screens/OurLibraryScreen/NewsPostScreen";
import Settings from "./screens/SettingsScreen";
import Profile from "./screens/SettingsScreen/ProfileScreen";
import Password from "./screens/SettingsScreen/PasswordScreen";
import Notifications from "./screens/SettingsScreen/NotificationsScreen";
import Account from "./screens/SettingsScreen/AccountScreen";
import Withdraw from "./screens/WithdrawScreen";
import NotFound from "./screens/NotFound";
import Auth from "./screens/AuthScreens/auth";
import PrivateRoutes from "./components/PrivateRoute";
import ResetPassword from "./screens/AuthScreens/ResetPassword";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/LoaderComponent";
import Kyc from "./screens/SettingsScreen/KycScreen";
import BankInfo from "./screens/SettingsScreen/BankInfo";
import LandingScreen from "./screens/LandingScreen";
import AdminScreen from "./screens/AdminScreen";
import LoginAdmin from "./screens/AdminScreen/login";
import ProductsAdmin from "./screens/AdminScreen/Products";
import News from "./screens/AdminScreen/News";
import AdminRoutes from "./components/AdminRoute";
import TransactionsScreen from "./screens/AdminScreen/Transactions";
import Customers from "./screens/AdminScreen/Customers";
import Enquiries from "./screens/AdminScreen/Enquiries";

const Wrapper = ({ children }: any) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
                <BrowserRouter>
                    <Wrapper>
                        <Routes>
                            <Route path="/" element={<App />}>
                                <Route index element={<LandingScreen />} />
                                <Route path="auth" element={<Auth />}>
                                    <Route path="sign-in" element={<Login />} />
                                    <Route
                                        path="sign-up"
                                        element={<Register />}
                                    />
                                    <Route
                                        path="confirm-email"
                                        element={<ConfirmEmail />}
                                    />
                                    <Route
                                        path="forgot-password"
                                        element={<ForgotPassword />}
                                    />
                                    <Route
                                        path="reset-password"
                                        element={<ResetPassword />}
                                    />
                                </Route>
                                <Route element={<AdminRoutes />}>
                                    <Route
                                        path="admin/dashboard"
                                        element={<AdminScreen />}
                                    />
                                    <Route
                                        path="admin/news"
                                        element={<News />}
                                    />
                                    <Route
                                        path="admin/transactions"
                                        element={<TransactionsScreen />}
                                    />
                                </Route>
                                <Route
                                    path="admin/sign-in"
                                    element={<LoginAdmin />}
                                />
                                <Route
                                    path="admin/products"
                                    element={<ProductsAdmin />}
                                />
                                <Route
                                    path="admin/customers"
                                    element={<Customers />}
                                />
                                <Route
                                    path="admin/enquiries"
                                    element={<Enquiries />}
                                />
                                <Route element={<PrivateRoutes />}>
                                    <Route
                                        path="dashboard"
                                        element={<DashboardScreen />}
                                    />
                                    <Route
                                        path="transactions"
                                        element={<Transactions />}
                                    />
                                    <Route
                                        path="fund-wallet"
                                        element={<FundWallet />}
                                    />
                                    <Route path="plan" element={<Plan />} />
                                    <Route
                                        path="products"
                                        element={<Library />}
                                    >
                                        <Route index element={<Products />} />
                                        <Route
                                            path=":slug"
                                            element={<Product />}
                                        />
                                        <Route
                                            path="news/:id"
                                            element={<NewsPostScreen />}
                                        />
                                    </Route>
                                    <Route
                                        path="support"
                                        element={<Support />}
                                    />
                                    <Route
                                        path="settings"
                                        element={<Settings />}
                                    >
                                        <Route
                                            path="profile"
                                            element={<Profile />}
                                        />
                                        <Route
                                            path="password"
                                            element={<Password />}
                                        />
                                        <Route
                                            path="bank-info"
                                            element={<BankInfo />}
                                        />
                                        <Route path="kyc" element={<Kyc />} />
                                        <Route
                                            path="account"
                                            element={<Account />}
                                        />
                                        <Route
                                            path="notifications"
                                            element={<Notifications />}
                                        />
                                    </Route>
                                    <Route
                                        path="withdraw"
                                        element={<Withdraw />}
                                    />
                                </Route>
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </Wrapper>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
