import {
	faFolderPlus,
	faFolder,
	faStar,
	faFile,
	faPen,
	faFileCircleInfo,
	faTrash
} from "@fortawesome/pro-light-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
	faDownload,
	faEllipsisVertical,
	faMagnifyingGlass,
	faPlus,
	faLink,
	faUserPlus
} from "@fortawesome/pro-regular-svg-icons";

export enum IconRegularName {
	Download = "download",
	Ellipsis = "ellipsis-vertical",
	Plus = "plus",
	UserPlus = "user-plus",
	Link = "link",
	SearchGlass = "magnifying-glass"
}

export enum IconLightName {
	AddFolder = "folder-plus",
	Folder = "folder",
	File = "file",
	Pen = "pen",
	Star = "star",
	Trash = "trash",
	FileInfo = "file-circle-info"
}

const iconsRegular = {
	faDownload,
	faEllipsisVertical,
	faPlus,
	faLink,
	faUserPlus,
	faMagnifyingGlass,
	faPen,
	faTrash
};

const iconsLight = {
	faFolderPlus,
	faFolder,
	faFile,
	faStar,
	faFileCircleInfo,
	faEllipsisVertical
};

library.add(...Object.values(iconsRegular), ...Object.values(iconsLight));
