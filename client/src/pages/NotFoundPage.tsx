import { useState } from "react";
import User from "../store/User.ts";

const NotFoundPage = () => {
	const [value, dispatch] = useState(0);

	function onClickHandler() {
		dispatch(value + 1);
		console.log({ data: User.userData, token: User.token, isAuth: User.isAuth });
	}
	return (
		<div>
			<h2>NotFoundPage {value}</h2>
			<button style={{ height: 20, width: 60, borderRadius: 5, color: "gray" }} onClick={onClickHandler}>
				Тест
			</button>
		</div>
	);
};

export default NotFoundPage;
