import { User, UserAttributes, UserCreationAttributes } from "@models/models";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import tokenService, { Tokens } from "./tokenService";
import fileService from "./fileService";
import UserDto from "@dto/UserDto";
import { Model } from "sequelize";
import { UseragentData } from "@middlewares/userAgentMiddleware";

export interface UserWithTokens {
	user: UserDto;
	tokens: Tokens;
}

export type UserModel = Model<UserAttributes, UserCreationAttributes>;

interface UserAttributesAndUseragent extends UserCreationAttributes {
	useragentData: UseragentData;
}

interface RefreshTokenAndUseragent {
	useragentData: UseragentData;
	refreshToken: string;
	id?: string | number;
}
class UserService {
	async getUser({ id, email }: { id?: string | number; email?: string }): Promise<UserModel> {
		const criteria: { id?: string | number; email?: string } = {};

		if (id) {
			criteria.id = id;
		} else if (email) {
			criteria.email = email;
		} else {
			throw new Error("Некорректный Email");
		}

		const user = await User.findOne({ where: criteria });
		if (!user) {
			throw new Error("Пользователь не найден");
		}

		return user;
	}

	async registration({ email, password, useragentData }: UserAttributesAndUseragent): Promise<UserWithTokens> {
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			throw new Error("Пользователь с такой почтой уже существует");
		}

		const hashPassword = await bcrypt.hash(password, 4);
		const activationLink = v4();

		const user = await User.create({ email, password: hashPassword, activationLink });

		// mail service !

		const userDto = new UserDto(user.dataValues);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken({ userId: userDto.id, refreshToken: tokens.refreshToken, ...useragentData });

		await fileService.createDir({ userId: userDto.id, folderName: "userFolder" });

		return { tokens, user: userDto };
	}

	async login({ email, password, useragentData }: UserAttributesAndUseragent): Promise<UserWithTokens> {
		const user = await this.getUser({ email });

		const isPassEquals = await bcrypt.compare(password, user.dataValues.password);
		if (!isPassEquals) {
			throw new Error("Некорректный пароль");
		}

		const userDto = new UserDto(user.dataValues);

		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken({ userId: userDto.id, refreshToken: tokens.refreshToken, ...useragentData });

		return { tokens, user: userDto };
	}

	async authorization(props: RefreshTokenAndUseragent): Promise<UserWithTokens> {
		const { id, useragentData, refreshToken: oldToken } = props;

		const user = await this.getUser({ id });
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

	async refresh({ refreshToken: oldToken, useragentData }: RefreshTokenAndUseragent): Promise<UserWithTokens> {
		const userData = await tokenService.validateRefreshToken(oldToken);
		if (!userData) {
			throw new Error("Не авторизован");
		}

		const user = (await this.getUser({ id: userData.id })) as UserModel;
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
}

export default new UserService();
