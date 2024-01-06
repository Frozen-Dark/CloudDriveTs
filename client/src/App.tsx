import "./styles/App.module.scss";
import Router from "@components/Router/Router";
import MainContainer from "@components/MainConteiner/MainContainer";
import WallpaperContainer from "@components/WallpaperContainer/WallpaperContainer";
import { useEffect } from "react";
import { refresh } from "@actions/user";
import FolderProvider from "./app/providers/FolderProvider/ui/FolderProvider";
import FileProvider from "@app/providers/FileProvider/ui/FileProvider";
import { faDownload, faFolderDownload, faUser } from "@fortawesome/pro-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faUser, faDownload);

function App() {
	useEffect(() => {
		void refresh();
	}, []);

	return (
		<MainContainer>
			<WallpaperContainer>
				<FolderProvider>
					<FileProvider>
						<Router />
					</FileProvider>
				</FolderProvider>
			</WallpaperContainer>
		</MainContainer>
	);
}

export default App;
