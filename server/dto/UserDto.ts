import { UserAttributes } from "@models/models";
import { UserDecoded } from "@services/tokenService";

export default class UserDto {
	id;
	email;
	storageLimit;
	userStorage;
	isActivated;
	activationLink;
	avatar;
	userName;
	constructor(model: UserAttributes) {
		this.id = model.id;
		this.email = model.email;
		this.storageLimit = model.storageLimit;
		this.userStorage = model.userStorage;
		this.isActivated = model.isActivated;
		this.activationLink = model.activationLink;
		this.avatar = model.avatar;
		this.userName = model.userName;
	}
}
