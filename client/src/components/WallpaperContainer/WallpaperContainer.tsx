import classes from "./WallpaperContainer.module.scss";
import { FC, HTMLProps, ReactNode } from "react";
interface WallpaperContainer extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
}

const WallpaperContainer: FC<WallpaperContainer> = ({ children }) => {
	return <div className={classes.wallpaperContainer}>{children}</div>;
};

export default WallpaperContainer;
