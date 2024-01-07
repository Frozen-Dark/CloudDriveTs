import classes from "./WallpaperContainer.module.scss";
import { FC, HTMLProps, ReactNode } from "react";
interface WallpaperContainerProps extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
}

const WallpaperContainer: FC<WallpaperContainerProps> = ({ children }) => {
	return <div className={classes.wallpaperContainer}>{children}</div>;
};

export default WallpaperContainer;
