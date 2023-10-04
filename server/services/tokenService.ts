import jwt from "jsonwebtoken";
import * as process from "process";
import dotenv from "dotenv";
import { Token } from "@models/models";
import UserDto from "@dto/UserDto";

dotenv.config();

export interface Token {
	accessToken: string;
	refreshToken: string;
}

class TokenService {
	generateTokens({ email, id, userName }: UserDto): Token {
		const accessToken = jwt.sign({ email, id, userName }, process.env.JWT_ACCESS_KEY!, {
			expiresIn: process.env.JWT_ACCESS_EXPRISE
		});

		const refreshToken = jwt.sign({ email, id, userName }, process.env.JWT_REFRESH_KEY!, {
			expiresIn: process.env.JWT_REFRESH_EXPRISE
		});

		return {
			accessToken,
			refreshToken
		};
	}

	async saveToken(userId: number, refreshToken: string, tokenId?: number, deviceInfo?: string, ip?: string) {
		const token = tokenId ? await Token.findOne({ where: { id: tokenId } }) : undefined;

		if (!token) {
			const token = await Token.create({
				userId,
				refreshToken,
				deviceInfo,
				ip
			});

			return await token.save();
		}

		token.dataValues.refreshToken = refreshToken;
		return await token.save();
	}

	async getAllTokens(userId: number) {
		const tokens = await Token.findAll({ where: { userId } });
	}

	validateAccessToken(accessToken: string) {
		try {
			const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY || "");
			console.log(userData);
			return userData;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(accessToken: string) {
		try {
			const userData = jwt.verify(accessToken, process.env.JWT_REFRESH_KEY || "");
			console.log(userData);
			return userData;
		} catch (e) {
			return null;
		}
	}
}

export default new TokenService();
