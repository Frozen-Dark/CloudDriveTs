import { User, UserAttributes, UserCreationAttributes } from "@models/models";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import tokenService, { Tokens, UserDecoded } from "./tokenService";
import UserDto from "@dto/UserDto";
import { Model } from "sequelize";
import { UseragentData } from "@middlewares/userAgentMiddleware";
import { Client } from "minio";
import FolderService from "@services/folderService";
import MinoService from "@services/minoService";
import ApiError from "@error/ApiError";
import TokenService from "./tokenService";

export interface UserWithTokens {
	user: UserDto;
	tokens: Tokens;
}

export type UserModel = Model<UserAttributes, UserCreationAttributes>;

interface UserAttributesAndUseragent extends UserCreationAttributes {
	useragentData: UseragentData;
	minioClient?: Client;
}

interface RefreshTokenAndUseragent {
	useragentData: UseragentData;
	refreshToken: string;
	id?: string | number;
}

class UserService {
	async getUser({ id, email }: { id?: number; email?: string }): Promise<UserModel> {
		const criteria: { id?: number; email?: string } = {};

		if (id) {
			criteria.id = id;
		} else if (email) {
			criteria.email = email;
		} else {
			throw ApiError.badRequest("Не указаны данные для получения пользователя");
		}

		const user = await User.findOne({ where: criteria });
		if (!user) {
			throw ApiError.notFound("Пользователь не найден");
		}

		return user;
	}

	async registration({
		email,
		password,
		useragentData,
		minioClient
	}: UserAttributesAndUseragent): Promise<UserWithTokens> {
		const candidate = await User.findOne({ where: { email } });

		if (candidate) throw ApiError.badRequest("Пользователь с такой почтой уже существует");
		if (!minioClient) throw ApiError.internal("Хранилище S3 не подключено");

		const hashPassword = await bcrypt.hash(password, 4);
		const activationLink = v4();

		const user = await User.create({ email, password: hashPassword, activationLink });

		// mail service !
		const userDto = new UserDto(user.dataValues);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.createNewToken({
			userId: userDto.id,
			refreshToken: tokens.refreshToken,
			...useragentData
		});

		await FolderService.createDir({
			userId: userDto.id,
			folderName: "userFolder",
			parentId: null
		});

		await MinoService.createBucket({ userId: userDto.id, mino: minioClient });
		return { tokens, user: userDto };
	}

	async login({ email, password, useragentData }: UserAttributesAndUseragent): Promise<UserWithTokens> {
		const user = await this.getUser({ email });

		const isPassEquals = await bcrypt.compare(password, user.dataValues.password);
		if (!isPassEquals) throw ApiError.badRequest("Некорректный пароль");

		const userDto = new UserDto(user.dataValues);

		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.createNewToken({ userId: userDto.id, refreshToken: tokens.refreshToken, ...useragentData });

		return { tokens, user: userDto };
	}

	async refresh({ refreshToken: oldToken, useragentData }: RefreshTokenAndUseragent): Promise<UserWithTokens> {
		const userData = await tokenService.validateRefreshToken(oldToken);
		if (!userData) {
			throw ApiError.forbidden("Нет доступа");
		}
		await TokenService.findToken(oldToken); // токен можно использовать только 1 раз.

		const user = await this.getUser({ id: userData.id });
		const userDto = new UserDto(user.dataValues);

		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken({
			userId: userDto.id,
			refreshToken: tokens.refreshToken,
			oldToken,
			...useragentData
		});

		return { tokens, user: userDto };
	}

	async clearSpace({ userId, fileSize }: { userId: number; fileSize: number }): Promise<void> {
		const user = await this.getUser({ id: userId });
		const { userStorage } = user.dataValues;

		if (userStorage) {
			const newSpace = Math.max(userStorage - fileSize, 0);
			await user.update({ userStorage: newSpace });
		}
	}

	async logout({ refreshToken }: { refreshToken: string }) {
		await TokenService.destroyToken(refreshToken);
	}
}

export default new UserService();
