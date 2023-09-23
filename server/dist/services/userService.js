"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const UserDto_1 = __importDefault(require("../dtos/UserDto"));
const tokenService_1 = __importDefault(require("./tokenService"));
const fileService_1 = __importDefault(require("./fileService"));
class UserService {
    async registration({ email, password }) {
        const candidate = await models_1.User.findOne({ where: { email } });
        if (candidate) {
            throw new Error("Пользователь с такой почто уже сущесвтует");
        }
        console.log(candidate);
        const hashPassword = await bcrypt_1.default.hash(password, 4);
        const activationLink = (0, uuid_1.v4)();
        const user = await models_1.User
            .create({ email, password: hashPassword, activationLink });
        // mail service !
        const userDto = new UserDto_1.default(user.dataValues);
        await fileService_1.default.createDir({ userId: userDto.id, folderName: "userFolder" });
        const tokens = tokenService_1.default.generateTokens({ ...userDto });
        await tokenService_1.default.saveToken(userDto.id, tokens.refreshToken);
        // file service create dir
        return { tokens, user: userDto };
    }
}
exports.default = new UserService();
