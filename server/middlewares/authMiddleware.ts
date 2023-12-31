import { NextFunction, Request, Response } from "express";
import tokenService, { UserDecoded } from "@services/tokenService";
import ApiError from "../error/ApiError";

declare global {
	namespace Express {
		interface Request {
			user: UserDecoded;
		}
	}
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization;
		const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];

		if (!accessToken) {
			return next(ApiError.badRequest("Нету токена"));
		}

		const userData = tokenService.validateAccessToken(accessToken);

		if (!userData) {
			return next(ApiError.unauthorized());
		}
		req.user = userData as UserDecoded;
		next();
	} catch (e) {
		return res.status(401).json({ message: "Не авторизован" });
	}
}

export default authMiddleware;
