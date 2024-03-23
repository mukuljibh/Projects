import React from "react";
import App from "./components/dashboard/App";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
// router are here to link the react application 
const root = createRoot(document.getElementById('root'))

root.render
    (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/App" element={<App />} />

            </Routes>
        </Router>
    );
