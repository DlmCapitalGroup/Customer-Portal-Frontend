import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";

function App() {
    const navigate = useNavigate();
    const { user, customer }: any = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (user === null && customer === null) {
            navigate("/sign-in");
        }
    }, [user, customer, navigate]);
    return (
        <div className="App">
            <Outlet />
        </div>
    );
}

export default App;
