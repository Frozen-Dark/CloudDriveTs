import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";
import classes from "./Auth.module.scss";
import { observer } from "mobx-react";
import User from "@store/User";
import { AppRoutes, RoutePath } from "@config/routeConfig/routeConfig";
import { login, registration } from "@actions/user";
import Button, { ButtonTheme } from "@ui/Button/Button";
import Input from "@ui/Input/Input";

const Auth = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isLoginRoute = pathname === RoutePath[AppRoutes.LOGIN];
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const loginHandler = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await login({ email, password });
		setPassword("");
	};

	const registrationHandler = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await registration({ email, password });
		setPassword("");
	};

	useEffect(() => {
		if (User.isAuth) {
			navigate("/disk");
		}
	}, [User.isAuth]);

	function changeRouteHandler() {
		setEmail("");
		setPassword("");
	}

	return (
		<form className={classes.container}>
			{isLoginRoute ? (
				<div>
					<h2 className={classes.form__title}>Вход</h2>

					<Input
						className={classes.authInput}
						value={email}
						onChange={(value) => setEmail(value)}
						placeholder={"E-mail"}
						type={"text"}
					/>

					<Input
						className={classes.authInput}
						onChange={(value) => setPassword(value)}
						value={password}
						type={"password"}
						placeholder={"Пароль"}
					/>

					<Button
						theme={ButtonTheme.BACKGROUND_AZURE}
						className={classes.myButton}
						onClick={(e) => loginHandler(e)}
					>
						Войти
					</Button>
				</div>
			) : (
				<div className="form">
					<h2 className={classes.form__title}>Регистрация</h2>
					<Input
						className={classes.authInput}
						value={email}
						onChange={(value) => setEmail(value)}
						placeholder={"E-mail"}
						type={"text"}
					/>

					<Input
						className={classes.authInput}
						value={password}
						required
						onChange={(value) => setPassword(value)}
						placeholder={"Пароль"}
						type={"password"}
					/>

					<Button
						theme={ButtonTheme.BACKGROUND_AZURE}
						className={classes.myButton}
						onClick={(e) => registrationHandler(e)}
					>
						Зарегистрироваться
					</Button>
				</div>
			)}

			<div className={classes.setUser}>
				<span>{isLoginRoute ? "Нет аккаунта? " : "Есть аккаунт? "}</span>
				<NavLink
					onClick={changeRouteHandler}
					className={classes.link}
					to={RoutePath[isLoginRoute ? AppRoutes.REGISTRATION : AppRoutes.LOGIN]}
				>
					{isLoginRoute ? "Зарегистрируйся!" : "Войдите!"}
				</NavLink>
			</div>
		</form>
	);
};

export default observer(Auth);
