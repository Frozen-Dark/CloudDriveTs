import "./styles/App.module.scss";
import Router from "@components/Router/Router";
import MainContainer from "@components/MainConteiner/MainContainer";
import WallpaperContainer from "@components/WallpaperContainer/WallpaperContainer";
import { useEffect } from "react";
import { refresh } from "@actions/user";

function App() {
	useEffect(() => {
		refresh();
	}, []);

	return (
		<MainContainer>
			<WallpaperContainer>
				<Router />
			</WallpaperContainer>
		</MainContainer>
	);
}

export default App;
