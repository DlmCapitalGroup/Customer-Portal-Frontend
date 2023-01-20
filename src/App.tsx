import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./store/hooks";

function App() {
    const { messageType }: any = useAppSelector((state) => state.toast);
    return (
        <div className="App">
            <Outlet />
            <ToastContainer
                progressStyle={{
                    backgroundColor: `${
                        messageType === "error" ? "#F04C4C" : "#6ED73E"
                    }`,
                    backgroundImage: "none",
                }}
                style={{ color: "#09335E" }}
            />
        </div>
    );
}

export default App;
