import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screens/AuthScreens/LoginScreen';
import Register from './screens/AuthScreens/RegisterScreen';
import ConfirmEmail from './screens/AuthScreens/ConfirmEmailScreen';
import DashboardScreen from './screens/DashboardScreen';
import Transactions from './screens/TransactionsScreen';
import History from './screens/TransactionsScreen/HistoryComponent';
import Overview from './screens/TransactionsScreen/OverviewScreen';
import ForgotPassword from './screens/AuthScreens/ForgotPasswordScreen';
import Plan from './screens/PlanScreen';
import Library from './screens/OurLibraryScreen';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<Register />} />
          <Route path="confirm-email" element={<ConfirmEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route index element={<DashboardScreen />} />
          <Route path="transactions" element={<Transactions />}>
            <Route path="history" element={<History />} />
            <Route index element={<Overview />} />
          </Route>
          <Route path="plan" element={<Plan />} />
          <Route path="library" element={<Library />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
