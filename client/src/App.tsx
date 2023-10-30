import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { authRoutes, publicRoutes } from "./routes";
import NotFoundPage from "./pages/NotFoundPage";
import "./styles/App.css";
function App() {
	const [userAuth, dispatch] = useState(false);

	useEffect(() => {
		dispatch(true);
	}, []);

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
}

export default App;
