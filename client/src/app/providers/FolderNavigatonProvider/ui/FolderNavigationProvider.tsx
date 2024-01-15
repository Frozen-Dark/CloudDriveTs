import { FC, ReactNode } from "react";
import { useFolderNavigation } from "@app/providers/FolderNavigatonProvider/lib/useFolderNavigation";
import { FolderNavigation } from "@app/providers/FolderNavigatonProvider/lib/FolderNavigationContext";

const FolderNavigationProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return <FolderNavigation.Provider value={useFolderNavigation()} children={children} />;
};

export default FolderNavigationProvider;
