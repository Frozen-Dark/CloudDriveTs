import { User, UserAttributes } from "@models/models";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import tokenService, { Token } from "./tokenService";
import fileService from "./fileService";
import UserDto from "@dto/UserDto";

interface RegistrationUser {
	user: UserAttributes;
	tokens: Token;
}

class UserService {
	async registration({ email, password }: { email: string; password: string }): Promise<RegistrationUser> {
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

		await tokenService.saveToken(userDto.id!, tokens.refreshToken);

		await fileService.createDir({ userId: userDto.id, folderName: "userFolder" });

		return { tokens, user: userDto };
	}
}

export default new UserService();
