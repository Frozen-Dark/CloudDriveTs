import cls from "./Spinner.module.scss";

const Spinner = ({ className }: { className?: string }) => (
	<div className={cls.Spinner}>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
);

export default Spinner;
