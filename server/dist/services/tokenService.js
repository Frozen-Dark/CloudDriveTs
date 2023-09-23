"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process = __importStar(require("process"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const models_1 = require("../models/models");
class TokenService {
    generateTokens({ email, id, userName }) {
        const accessToken = jsonwebtoken_1.default
            .sign({ email, id, userName }, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.JWT_ACCESS_EXPRISE });
        const refreshToken = jsonwebtoken_1.default
            .sign({ email, id, userName }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPRISE });
        return {
            accessToken,
            refreshToken
        };
    }
    async saveToken(userId, refreshToken, deviceInfo, ip) {
        const tokens = await models_1.Token.findAll({ where: { userId } });
        if (!tokens) {
            return await models_1.Token.create({ userId, refreshToken, deviceInfo, ip });
        }
    }
}
exports.default = new TokenService();
