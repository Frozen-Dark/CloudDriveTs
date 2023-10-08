import { NextFunction, Request, Response } from "express";
export type UseragentData = { ip: string; platform: string; browser: string; browserVersion?: string };

declare global {
	namespace Express {
		interface Request {
			useragentData: UseragentData | undefined;
		}
	}
}

function userAgentMiddleware(req: Request, res: Response, next: NextFunction) {
	if (!req.useragent) {
		return res.status(400).json({ message: "Нету инфы про тебя" });
	}
	const test: UseragentData = {
		ip: req.ip,
		platform: req.useragent.platform,
		browser: req.useragent.browser,
		browserVersion: req.useragent.version
	};
	console.log(test);
	req.useragentData = test;

	next();
}

export default userAgentMiddleware;
