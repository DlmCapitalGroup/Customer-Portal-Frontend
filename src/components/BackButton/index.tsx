import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
    const navigate = useNavigate();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="#09335E"
            className="w-6 h-6 mb-10"
            onClick={() => navigate(-1)}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
        </svg>
    );
};

export default Back;
