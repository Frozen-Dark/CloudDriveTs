import {User, UserAttributes} from "../models/models"
import bcrypt from "bcrypt"
import {v4} from "uuid"
import UserDto from "../dtos/UserDto";
import tokenService, {Token} from "./tokenService";
import fileService from "./fileService";

interface RegistrationUser {
    user: UserAttributes;
    tokens: Token;
}

class UserService {
    
    async registration({email, password}: {email: string, password: string}): Promise<RegistrationUser> {
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            throw new Error("Пользователь с такой почто уже сущесвтует")
        }
        console.log(candidate)
        const hashPassword = await bcrypt.hash(password, 4)
        const activationLink = v4()

        const user = await User
            .create({email, password: hashPassword, activationLink});
        // mail service !
        const userDto = new UserDto(user.dataValues);
        await fileService.createDir({userId: userDto.id, folderName: "userFolder"})

        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id!, tokens.refreshToken)

        // file service create dir

        return {tokens, user: userDto}
    }
}

export default new UserService();
