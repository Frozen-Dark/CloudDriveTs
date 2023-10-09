import jwt from "jsonwebtoken";
import * as process from "process";
import dotenv from "dotenv";
import { Token, TokenAttributes, TokenCreationAttributes } from "@models/models";
import UserDto from "@dto/UserDto";
import { Model, Op } from "sequelize";
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
	oldToken: string;
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

	async saveToken(props: SaveToken): Promise<void> {
		const { userId, refreshToken, oldToken, ip, platform, browser, browserVersion } = props;

		const token = await this.findToken(oldToken);
		const updateValues: { refreshToken: string; browserVersion?: string; ip?: string } = { refreshToken };

		if (token.dataValues.platform !== platform || token.dataValues.browser !== browser) {
			throw new Error("Непредвиденная ошибка");
		}

		if (token.dataValues.browserVersion !== browserVersion || token.dataValues.ip !== ip) {
			updateValues.browserVersion = browserVersion;
			updateValues.ip = ip;
		}

		await token.update(updateValues);
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

	async createNewToken(props: TokenCreationAttributes & UseragentData): Promise<void> {
		const { userId, refreshToken, ip, platform, browser, browserVersion } = props;

		const token = await Token.create({
			userId,
			refreshToken,
			ip,
			browser,
			platform,
			browserVersion
		});
	}

	async clearOldTokens({ userId, useragentData }: { userId: number; useragentData: UseragentData }) {
		const THIRTY_DAYS_AGO = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);

		await Token.destroy({
			where: {
				userId: userId,
				[Op.or]: [
					{
						platform: useragentData.platform,
						browser: useragentData.browser,
						[Op.or]: [
							{ browserVersion: { [Op.ne]: useragentData.browserVersion } },
							{ ip: { [Op.ne]: useragentData.ip } }
						]
					},
					{
						updatedAt: { [Op.lt]: THIRTY_DAYS_AGO }
					}
				]
			}
		});
	}
}

export default new TokenService();
