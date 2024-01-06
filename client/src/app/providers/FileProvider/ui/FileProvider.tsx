import { FC, ReactNode } from "react";
import { useFile } from "@app/providers/FileProvider/lib/useFile";
import { FileContext } from "../lib/FileContext";

const FileProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const { files, ...functions } = useFile();

	return <FileContext.Provider value={{ files, ...functions }}>{children}</FileContext.Provider>;
};

export default FileProvider;
