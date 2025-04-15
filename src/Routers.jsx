import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreeScene from "./App";
import Details from "./Details";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/plant" element={<ThreeScene/>}/>
                <Route path="/details/:modal" element={<Details/>}/>
            </Routes>
        </BrowserRouter>
    )
}