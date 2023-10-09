import userService from "@services/userService";
import { Request, Response } from "express";
import { UserCreationAttributes } from "@models/models";
import { UseragentData } from "@middlewares/userAgentMiddleware";
import tokenService from "@services/tokenService";

class UserController {
	async registration(req: Request, res: Response) {
		try {
			const { email, password }: UserCreationAttributes = req.body;
			const useragentData = req.useragentData;

			const userData = await userService.registration({ email, password, useragentData });
			res.cookie("refreshToken", userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			return res.json(userData);
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "registration error" });
		}
	}

	async login(req: Request, res: Response) {
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
			console.log(e);
			return res.status(400).json({ message: "login error" });
		}
	}

	async authorization(req: Request, res: Response) {
		try {
			const { refreshToken } = req.cookies;
			if (!refreshToken) {
				return res.status(400).json({ message: "refresh out" });
			}

			const { id } = req.user;
			const useragentData = req.useragentData;

			const userData = await userService.authorization({ id, useragentData, refreshToken });

			res.cookie("refreshToken", userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			return res.json(userData);
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "refresh error" });
		}
	}

	async refresh(req: Request, res: Response) {
		try {
			const { refreshToken } = req.cookies;
			if (!refreshToken) {
				return res.status(400).json({ message: "refresh out" });
			}
			const useragentData = req.useragentData;
			const userData = await userService.refresh({ refreshToken, useragentData });
			res.cookie("refreshToken", userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			return res.json(userData);
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "refresh error" });
		}
	}

	async logout(req: Request, res: Response) {
		try {
			const { refreshToken } = req.cookies;
			if (!refreshToken) {
				return res.status(500).json({ message: "Непредвиденная ошибка" });
			}
			res.clearCookie("refreshToken");
			//  <-- this work
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "refresh error" });
		}
	}
}

export default new UserController();
