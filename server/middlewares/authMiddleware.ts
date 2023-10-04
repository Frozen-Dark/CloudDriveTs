import { NextFunction, Response } from "express";
import { UserAttributes } from "@models/models";
import { customRequest } from "@routes/customInterface";
import tokenService from "@services/tokenService";

function authMiddleware(req: customRequest, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization;
		const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];

		if (!accessToken) {
			return res.status(401).json({ message: "Не авторизован" });
		}

		const userData = tokenService.validateAccessToken(accessToken);

		if (!userData) {
			return res.status(403);
		}

		req.user = userData as UserAttributes;
		next();
	} catch (e) {
		next(res.status(401).json({ message: "Не авторизован" }));
	}
}

export default authMiddleware;
