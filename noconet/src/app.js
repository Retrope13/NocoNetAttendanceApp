import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function SplashPage() {
    return (
        <div id="wrapperDiv">
            <h1>Testing js</h1>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SplashPage />);