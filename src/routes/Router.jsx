import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "../components/Menu";
import App from "../screens/App";
import Login from "../screens/Login";

export default function Router() {
    return(
        <>
            <BrowserRouter>
            <Menu/>
                <Routes>
                    <Route index path="/" element={<App/>}/>
                    <Route  path="/login" element={<Login/>}/>                  
                </Routes>
            </BrowserRouter>
        </>
    )
}