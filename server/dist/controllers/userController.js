"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    // @ts-ignore
    async registration(req, res) {
        try {
            const { email, password } = req.body;
            const userData = await userService_1.default.registration({ email, password });
            return res.json(userData);
        }
        catch (e) {
            console.log(e);
            return res.status(400).json({ message: "reg error" });
        }
    }
}
exports.default = new UserController();
