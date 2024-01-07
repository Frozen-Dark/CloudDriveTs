import classes from "./MainContainer.module.scss";
import { FC, HTMLProps, ReactNode } from "react";
interface MainContainerProps extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ children }) => {
	return (
		<div data-theme={"dark"} className={classes.mainContainer}>
			{children}
		</div>
	);
};

export default MainContainer;
