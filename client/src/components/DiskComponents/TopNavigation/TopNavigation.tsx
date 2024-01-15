import React, { Fragment, HTMLAttributes, useContext, useEffect } from "react";
import cls from "./TopNavigation.module.scss";
import { classNames } from "@lib/classNames/classNames";
import Text from "@ui/Text/Text";
import Button, { ButtonTheme } from "@ui/Button/Button";
import { FolderNavigation } from "@app/providers/FolderNavigatonProvider/lib/FolderNavigationContext";

interface TopNavigationProps extends HTMLAttributes<HTMLDivElement> {
	openFolder: (id: number | null) => Promise<void>;
}

const TopNavigation = ({ className, openFolder }: TopNavigationProps) => {
	const { stack, rootFolder } = useContext(FolderNavigation);

	const openFolderHandler = async (id: number | null) => {
		await openFolder(id);
	};

	if (!rootFolder) {
		return null;
	}

	return (
		<div className={classNames(cls.topNavigation, {}, [className])}>
			<Item onClick={() => openFolderHandler(rootFolder.id)} text={rootFolder.folderName} />

			{stack.map((folder) => (
				<Fragment key={folder.id}>
					<Text style={{ paddingTop: "3px" }} title={" > "} />
					<Item onClick={() => openFolderHandler(folder.id)} text={folder.folderName} />
				</Fragment>
			))}
		</div>
	);
};

const Item = ({ text, ...otherProps }: { text: string } & HTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button theme={ButtonTheme.TRANSPARENT} {...otherProps}>
			<Text title={text} />
		</Button>
	);
};

export default TopNavigation;
