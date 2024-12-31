import React from 'react';
import './App.css';
import {RouterProvider, } from "react-router";
import appRouter from "./app.router";
import {AuthenticatedProvider} from "./shared/Authenticated";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
    return (
        <AuthenticatedProvider>
            <RouterProvider router={appRouter} />

        </AuthenticatedProvider>
    )
}

export default App;
