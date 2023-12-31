import cls from "./Loader.module.scss";
import { classNames } from "@lib/classNames/classNames";

const Loader = ({ className }: { className?: string }) => {
	return (
		<div className={classNames(cls.lds_ellipsis, {}, [className])}>
			<div />
			<div />
			<div />
			<div />
		</div>
	);
};

export default Loader;
