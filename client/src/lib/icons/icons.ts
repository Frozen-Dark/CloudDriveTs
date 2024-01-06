import { faFolderPlus, faFolder, faFile } from "@fortawesome/pro-light-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
	faDownload,
	faEllipsisVertical,
	faLink,
	faMagnifyingGlass,
	faPen,
	faPlus,
	faStar,
	faTrash,
	faUserPlus,
	IconDefinition
} from "@fortawesome/pro-regular-svg-icons";

export enum IconRegularName {
	Download = "download",
	Ellipsis = "ellipsis-vertical",
	Plus = "plus",
	UserPlus = "user-plus",
	SearchGlass = "magnifying-glass",
	Pen = "pen",
	Link = "link",
	Trash = "trash",
	Star = "star"
}

export enum IconLightName {
	AddFolder = "folder-plus",
	Folder = "folder",
	File = "file"
}

export const iconsRegular: Record<IconRegularName, IconDefinition> = {
	download: faDownload,
	"ellipsis-vertical": faEllipsisVertical,
	plus: faPlus,
	"user-plus": faUserPlus,
	"magnifying-glass": faMagnifyingGlass,
	pen: faPen,
	link: faLink,
	trash: faTrash,
	star: faStar
};

export const iconsLight: Record<IconLightName, IconDefinition> = {
	"folder-plus": faFolderPlus,
	folder: faFolder,
	file: faFile
};

library.add(...Object.values(iconsRegular), ...Object.values(iconsLight));
