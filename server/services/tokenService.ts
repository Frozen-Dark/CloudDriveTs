import jwt from "jsonwebtoken";
import * as process from "process";
import dotenv from "dotenv";
import { Token, TokenAttributes, TokenCreationAttributes } from "@models/models";
import UserDto from "@dto/UserDto";
import { Model } from "sequelize";
import { UseragentData } from "@middlewares/userAgentMiddleware";

dotenv.config();

export interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export interface UserDecoded {
	id: number;
	email: string;
	isActivated: boolean;
}

type TokenModelType = Model<TokenAttributes, TokenCreationAttributes>;

interface SaveToken extends TokenCreationAttributes, UseragentData {
	oldToken?: string;
}
class TokenService {
	generateTokens({ email, id, isActivated }: UserDto): Tokens {
		const accessToken = jwt.sign({ email, id, isActivated }, process.env.JWT_ACCESS_KEY as string, {
			expiresIn: process.env.JWT_ACCESS_EXPRISE
		});

		const refreshToken = jwt.sign({ email, id, isActivated }, process.env.JWT_REFRESH_KEY as string, {
			expiresIn: process.env.JWT_REFRESH_EXPRISE
		});

		return {
			accessToken,
			refreshToken
		};
	}

	async saveToken(props: SaveToken): Promise<TokenModelType> {
		const { userId, refreshToken, oldToken, ip, platform, browser, browserVersion } = props;

		if (!oldToken) {
			const token = await Token.create({
				userId,
				refreshToken,
				ip,
				browser,
				platform,
				browserVersion
			});

			return await token.save();
		}
		const token = await this.findToken(oldToken);

		await token.update({ refreshToken });
		return await token.save();
	}

	async findToken(refreshToken: string): Promise<TokenModelType> {
		const token = await Token.findOne({ where: { refreshToken } });
		if (!token) {
			throw new Error("Токен не найден или уже использован");
		}
		return token;
	}

	async getAllTokens(userId: number): Promise<TokenModelType[] | null> {
		return await Token.findAll({ where: { userId } });
	}

	validateAccessToken(accessToken: string) {
		try {
			const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as string) as UserDecoded;
			console.log(userData);
			return userData;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(refreshToken: string) {
		try {
			const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as string) as UserDecoded;
			console.log(userData);
			return userData;
		} catch (e) {
			return null;
		}
	}
}

export default new TokenService();
