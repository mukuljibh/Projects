import React from "react";
import App from "./components/dashboard/App";
import Login from "./components/authentication/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
// router are here to link the react application 
const root = createRoot(document.getElementById('root'))

root.render
    (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/app" element={<App />} />
            </Routes>
        </Router>
    );
