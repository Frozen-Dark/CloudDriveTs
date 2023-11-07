import { authRoutes, publicRoutes } from "../../routes.ts";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage.tsx";
import User from "../../store/User.ts";
import { observer } from "mobx-react";

const Router = () => {
	const userAuth = User.isAuth;

	return (
		<Routes>
			{userAuth &&
				authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}

			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default observer(Router);
