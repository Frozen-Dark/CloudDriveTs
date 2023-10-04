import userService from "@services/userService";
import { customResponse, customRequest } from "@routes/customInterface";

class UserController {
	async registration(req: customRequest, res: customResponse) {
		try {
			const { email, password } = req.body;
			const userData = await userService.registration({ email, password });
			return res.json(userData);
		} catch (e) {
			console.log(e);
			return res.status(400).json({ message: "registration error" });
		}
	}
}

export default new UserController();
