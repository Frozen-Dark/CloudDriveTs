import { NextFunction, Request, Response } from "express";
import tokenService, { UserDecoded } from "@services/tokenService";

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
			return res.status(401).json({ message: "Не авторизован" });
		}

		const userData = tokenService.validateAccessToken(accessToken);

		if (!userData) {
			return res.status(403).json({ message: "Доступ запрещен" });
		}
		req.user = userData as UserDecoded;
		next();
	} catch (e) {
		return res.status(401).json({ message: "Не авторизован" });
	}
}

export default authMiddleware;
