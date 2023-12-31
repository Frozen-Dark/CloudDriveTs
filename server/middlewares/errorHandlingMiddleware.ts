import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";

function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
	console.log(error);
	if (error instanceof ApiError) {
		res.status(error.status).json({ message: error.message });
	} else {
		res.status(500).json({ message: "Internal Server Error", error });
	}
}

export default errorMiddleware;
