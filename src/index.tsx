import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="sign-in" element={<Login />} />
                    <Route path="sign-up" element={<Register />} />
                    <Route path="confirm-email" element={<ConfirmEmail />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route index element={<DashboardScreen />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="fund-wallet" element={<FundWallet />} />
                    <Route path="plan" element={<Plan />} />
                    <Route path="library" element={<Library />}>
                        <Route index element={<Products />} />
                        <Route path="products/:id" element={<Product />} />
                        <Route path="news/:id" element={<NewsPostScreen />} />
                    </Route>
                    <Route path="support" element={<Support />} />
                    <Route path="settings" element={<Settings />}>
                        <Route path="profile" element={<Profile />} />
                        <Route path="password" element={<Password />} />
                        <Route path="account" element={<Account />} />
                        <Route
                            path="notifications"
                            element={<Notifications />}
                        />
                    </Route>
                    <Route path="withdraw" element={<Withdraw />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
