import { action, makeAutoObservable, observable } from "mobx";

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
	@observable private _token?: string;
	@observable private _userData?: UserAttributes;
	@observable private _isAuth = false;
	constructor() {
		makeAutoObservable(this);
	}
	@action setIsAuth(state: boolean) {
		this._isAuth = state;
	}
	get isAuth(): boolean {
		return this._isAuth;
	}

	@action set token(token: string) {
		this._token = token;
	}
	get token(): string {
		return this._token || "";
	}

	@action set userData(user: UserAttributes) {
		this._userData = user;
	}

	get userData(): UserAttributes {
		if (this._userData) {
			return this._userData;
		}
		return {} as UserAttributes;
	}

	logout() {
		this._userData = undefined;
		this._token = undefined;
		this._isAuth = false;
	}
}

export default new User();
