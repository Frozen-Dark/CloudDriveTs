import classes from "./MainContainer.module.scss";
import { FC, HTMLProps, ReactNode } from "react";
import Footer from "@components/Footer/Footer";
interface MainContainerProps extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ children }) => {
	return (
		<div data-theme={"dark"} className={classes.mainContainer}>
			<>
				{children}
				<Footer />
			</>
		</div>
	);
};

export default MainContainer;
