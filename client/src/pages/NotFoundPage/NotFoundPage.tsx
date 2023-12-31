import React from "react";
import { useNavigate } from "react-router-dom";
import User from "@store/User";
import { RoutePath } from "@config/routeConfig/routeConfig";
import Button, { ButtonTheme } from "@ui/Button/Button";
import { classNames } from "@lib/classNames/classNames";
import cls from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
	const navigate = useNavigate();

	const navigateTo = () => {
		if (User.isAuth) {
			navigate(RoutePath.disk);
		} else {
			navigate(RoutePath.login);
		}
	};

	return (
		<div className={classNames(cls.notFoundContainer)}>
			<h1 className={cls.title}>404 - Страница не найдена</h1>
			<Button theme={ButtonTheme.BACKGROUND_AZURE} className={cls.button} onClick={navigateTo}>
				{User.isAuth ? "Перейти на страницу диска" : "Перейти на страницу логина"}
			</Button>
		</div>
	);
};

export default NotFoundPage;
