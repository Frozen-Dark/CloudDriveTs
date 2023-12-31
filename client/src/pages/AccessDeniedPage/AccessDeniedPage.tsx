import cls from "./AccessDeniedPage.module.scss";
import User from "@store/User";
import { RoutePath } from "@config/routeConfig/routeConfig";
import Button, { ButtonTheme } from "@ui/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const AccessDeniedPage = () => {
	const navigate = useNavigate();

	const navigateTo = () => {
		const routePath = User.isAuth ? RoutePath.disk : RoutePath.login;
		navigate(routePath);
	};

	return (
		<div className={cls.access_denied_container}>
			<h1>Доступ запрещен</h1>
			<p>У вас нет прав для доступа к этой странице.</p>
			<Button theme={ButtonTheme.OUTLINE} className={cls.button} onClick={navigateTo}>
				{User.isAuth ? "Перейти на страницу диска" : "Перейти на страницу логина"}
			</Button>
		</div>
	);
};

export default AccessDeniedPage;
