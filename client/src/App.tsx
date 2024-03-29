import Router from "@components/Router/Router";
import MainContainer from "@components/MainConteiner/MainContainer";
import WallpaperContainer from "@components/WallpaperContainer/WallpaperContainer";
import { useEffect } from "react";
import { refresh } from "@actions/user";
import FolderProvider from "./app/providers/FolderProvider/ui/FolderProvider";
import FileProvider from "@app/providers/FileProvider/ui/FileProvider";
import "./styles/App.module.scss";
import "@lib/icons/icons";
import FolderNavigation from "@app/providers/FolderNavigatonProvider/ui/FolderNavigationProvider";

function App() {
	useEffect(() => {
		void refresh();
	}, []);

	return (
		<MainContainer>
			<WallpaperContainer>
				<FolderProvider>
					<FileProvider>
						<FolderNavigation>
							<Router />
						</FolderNavigation>
					</FileProvider>
				</FolderProvider>
			</WallpaperContainer>
		</MainContainer>
	);
}

export default App;
