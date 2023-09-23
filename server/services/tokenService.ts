import jwt from "jsonwebtoken"
import * as process from "process";
import dotenv from "dotenv";
dotenv.config()
import {Token} from "../models/models";
import UserDto from "../dtos/UserDto";

export interface Token {
    accessToken: string,
    refreshToken: string
}

class TokenService {
    generateTokens({email, id, userName}: UserDto): Token {
        const accessToken = jwt
            .sign({email, id, userName}, process.env.JWT_ACCESS_KEY!, {expiresIn: process.env.JWT_ACCESS_EXPRISE});

        const refreshToken = jwt
            .sign({email, id, userName}, process.env.JWT_REFRESH_KEY!, {expiresIn: process.env.JWT_REFRESH_EXPRISE});

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string, deviceInfo?: string, ip?: string) {
        const tokens = await Token.findAll({where: {userId}});
        if (!tokens) {
            return await Token.create({userId, refreshToken, deviceInfo, ip})
        }
    }
}

export default new TokenService()
