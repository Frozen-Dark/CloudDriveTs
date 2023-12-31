import userService from "@services/userService";
import { NextFunction, Request, Response } from "express";
import { UserCreationAttributes } from "@models/models";
import tokenService from "@services/tokenService";
import ApiError from "@error/ApiError";
import UserService from "@services/userService";

class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password }: UserCreationAttributes = req.body;
			const useragentData = req.useragentData;

			const userData = await userService.registration({
				email,
				password,
				useragentData,
				minioClient: req.minioClient
			});

			res.cookie("refreshToken", userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password }: UserCreationAttributes = req.body;
			const useragentData = req.useragentData;
			const userData = await userService.login({ email, password, useragentData });

			res.cookie("refreshToken", userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				sameSite: "strict"
			});

			res.json(userData);

			await tokenService.clearOldTokens({ userId: userData.user.id, useragentData });
		} catch (e) {
			next(e);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;

			if (!refreshToken) {
				return next(ApiError.badRequest("Токен не указан"));
			}

			const useragentData = req.useragentData;
			const userData = await userService.refresh({ refreshToken, useragentData });
			res.cookie("refreshToken", userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			if (!refreshToken) {
				next(ApiError.badRequest("Токен не найден"));
			}

			await UserService.logout({ refreshToken });

			res.clearCookie("refreshToken").json({ message: "Выход был выполнен" });
		} catch (e) {
			next(e);
		}
	}
}

export default new UserController();
