import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppRoutes from "./routes";

const AppRoute = () => {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
};

export default AppRoute;