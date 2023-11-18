import "./styles/App.css";
import Router from "./components/Router/Router.tsx";
import MainContainer from "./components/MainConteiner/MainContainer.tsx";
import WallpaperContainer from "./components/WallpaperContainer/WallpaperContainer.tsx";
import { useEffect, useRef } from "react";
import { refresh } from "./actions/user.ts";
import Header from "./components/Header/Header.tsx";
function App() {
	const state = useRef({ value: true });

	useEffect(() => {
		if (state.current.value) {
			state.current.value = false;
			refresh();
		}
	}, []);

	return (
		<MainContainer>
			<WallpaperContainer>
				<Header />
				<Router />
			</WallpaperContainer>
		</MainContainer>
	);
}

export default App;
