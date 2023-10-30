import { NavLink, useLocation } from "react-router-dom";
import { useState, MouseEvent } from "react";
import classes from "./Auth.module.scss";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../routes";
const Auth = () => {
	const location = useLocation();
	const isLoginRoute = location.pathname === LOGIN_ROUTE;
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function loginHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
	}
	async function registrationHandler(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
	}

	return (
		<form className={classes.container}>
			{isLoginRoute ? (
				<div>
					<h2 className={classes.form__title}>Вход</h2>

					<input
						className={classes.authInput}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder={"E-mail"}
						type={"text"}
					/>

					<input
						className={classes.authInput}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder={"Пароль"}
						type={"password"}
					/>

					<button className={classes.myButton} onClick={(e) => loginHandler(e)}>
						Войти
					</button>
				</div>
			) : (
				<div className="form">
					<h2 className={classes.form__title}>Регистрация</h2>
					<input
						className={classes.authInput}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder={"E-mail"}
						type={"text"}
					/>

					<input
						className={classes.authInput}
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
						placeholder={"Пароль"}
						type={"password"}
					/>

					<button className={classes.myButton} onClick={(e) => registrationHandler(e)}>
						Зарегистрироваться
					</button>
				</div>
			)}

			<div className={classes.setUser}>
				<span>{isLoginRoute ? "Нет аккаунта? " : "Есть аккаунт? "}</span>
				<NavLink onClick={() => console.log("NAV")} to={isLoginRoute ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
					{isLoginRoute ? "Зарегистрируйся!" : "Войдите!"}
				</NavLink>
			</div>
		</form>
	);
};

export default Auth;
