import userService from "../services/userService";

class UserController {
    // @ts-ignore
    async registration(req, res) {
        try {
            const {email, password} = req.body;
            const userData = await userService.registration({email, password});
            return res.json(userData);
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "reg error"})
        }
    }
}

export default new UserController()
