import { FC, ReactNode } from "react";
import { FolderContext } from "../lib/FolderContext";
import { useFolder } from "../lib/useFolder";

const FolderProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { folders, parentFolder, ...functions } = useFolder();

	return (
		<FolderContext.Provider
			value={{
				folders,
				parentFolder,
				...functions
			}}
		>
			{children}
		</FolderContext.Provider>
	);
};

export default FolderProvider;
