import classes from "./MainContainer.module.scss";
import { FC, HTMLProps, ReactNode } from "react";
interface MainContainer extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
}

const MainContainer: FC<MainContainer> = ({ children }) => {
	return (
		<div data-theme={"dark"} className={classes.mainContainer}>
			{children}
		</div>
	);
};

export default MainContainer;
