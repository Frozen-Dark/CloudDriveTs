import { makeAutoObservable } from "mobx";

export interface UserAttributes {
	id: number;
	email: string;
	storageLimit?: number;
	userStorage?: number;
	isActivated?: boolean;
	activationLink?: string;
	avatar?: string;
	userName?: string;
}

class User {
	private _token?: string;
	private _userData?: UserAttributes;
	private _isAuth = false;
	constructor() {
		makeAutoObservable(this);
	}
	set isAuth(state: boolean) {
		this._isAuth = state;
	}
	get isAuth(): boolean {
		return this._isAuth;
	}

	set token(token: string) {
		this._token = token;
	}
	get token(): string | undefined {
		return this._token;
	}

	set userData(user: UserAttributes) {
		this._userData = user;
	}

	get userData(): UserAttributes | undefined {
		return this._userData;
	}
}

export default new User();
