import { NextFunction, Request, Response } from "express";
import { Client } from "minio";

import process from "process";

declare global {
	namespace Express {
		interface Request {
			minioClient: Client;
		}
	}
}

const minioClient = new Client({
	endPoint: "localhost",
	port: 9000,
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY as string,
	secretKey: process.env.MINIO_SECRET_KEY as string
});

function minoMiddleware(req: Request, res: Response, next: NextFunction) {
	req.minioClient = minioClient;
	next();
}

export default minoMiddleware;
