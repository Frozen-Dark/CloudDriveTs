import {
	faFolderPlus,
	faFolder,
	faStar,
	faFile,
	faPen,
	faFileCircleInfo,
	faTrash,
	faPalette,
	faGear,
	faCircleInfo,
	faArrowRightFromBracket
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
	FileInfo = "file-circle-info",
	Palette = "palette",
	Gear = "gear",
	CircleInfo = "circle-info",
	ArrowExit = "arrow-right-from-bracket"
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
	faEllipsisVertical,
	faPalette,
	faGear,
	faCircleInfo,
	faArrowRightFromBracket
};

library.add(...Object.values(iconsRegular), ...Object.values(iconsLight));
