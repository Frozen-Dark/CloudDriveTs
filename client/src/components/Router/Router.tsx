import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import { authRouteConfig, unauthRouteConfig } from "@config/routeConfig/routeConfig";
import User from "@store/User";

const Router = () => (
	<Routes>
		{Object.entries(User.isAuth ? authRouteConfig : unauthRouteConfig).map(([key, { path, Component }]) => (
			<Route key={key} path={path} Component={Component} />
		))}
	</Routes>
);

export default observer(Router);
