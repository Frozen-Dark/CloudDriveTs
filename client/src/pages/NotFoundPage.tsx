import { useState } from "react";

const NotFoundPage = () => {
	const [value, dispatch] = useState(0);

	return (
		<div>
			<h2>NotFoundPage {value}</h2>
			<button
				style={{ height: 20, width: 60, borderRadius: 5, color: "gray" }}
				onClick={() => dispatch(value + 1)}
			>
				Тест
			</button>
		</div>
	);
};

export default NotFoundPage;
