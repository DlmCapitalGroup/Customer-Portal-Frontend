import React from "react";

const AuthScreen = () => {
    return (
        <div className="min-h-screen bg-blue-200 p-20">
            <h1 className="text-3xl">AuthScreen</h1>

            <div className="space-x-3 mt-5">
                <button className="px-4 rounded-md py-2 bg-primary hover:bg-primary/80 text-white">Testing</button>
                <button className="px-4 rounded-md py-2 bg-secondary hover:bg-secondary/80 text-white">Testing</button>
            </div>
        </div>
    );
};

export default AuthScreen;
