import React from "react";
import App from "./components/dashboard/App";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom';
import Signin from "./components/authentication/Signin";
import SignUp from "./components/authentication/Signup";
// router are here to link the react application 
const root = createRoot(document.getElementById('root'))

root.render
    (
        <Router>
            <Routes>

                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/app" element={<App />} />

            </Routes>
        </Router>
    );
