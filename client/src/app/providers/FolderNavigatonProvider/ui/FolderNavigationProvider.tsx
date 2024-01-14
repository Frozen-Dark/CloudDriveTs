import { FC, ReactNode } from "react";
import { useFolderNavigation } from "@app/providers/FolderNavigatonProvider/lib/useFolderNavigation";
import {
	FolderNavigationStack,
	FolderNavigationFunctions
} from "@app/providers/FolderNavigatonProvider/lib/FolderNavigationContext";

const FolderNavigation: FC<{ children: ReactNode }> = ({ children }) => {
	const { stack, ...functions } = useFolderNavigation();

	return (
		<FolderNavigationFunctions.Provider value={{ ...functions }}>
			<FolderNavigationStack.Provider value={{ stack }} children={children} />
		</FolderNavigationFunctions.Provider>
	);
};

export default FolderNavigation;
