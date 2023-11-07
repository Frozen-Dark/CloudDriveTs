import axios from "axios";
import User, { UserAttributes } from "../store/User";

const API_URL = "http://localhost:5000";
axios.defaults.withCredentials = true;

interface UserWithTokens {
	user: UserAttributes;
	tokens: {
		accessToken: string;
	};
}

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
	const token = User.token;
	if (!token) {
		return config;
	}
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axios.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && error.config && !error.config._idRetry) {
			originalRequest._idRetry = true;
			try {
				await refresh();
				return axios.request(originalRequest);
			} catch (e) {
				console.log(e);
			}
		}
	}
);

export const login = async ({ email, password }: { email: string; password: string }): Promise<void> => {
	try {
		const response = await axios.post<UserWithTokens>(`${API_URL}/api/user/login`, {
			email,
			password
		});

		console.log(response);
		if (response.status === 200) {
			const { user, tokens } = response.data;

			User.isAuth = true;
			User.userData = user;
			User.token = tokens.accessToken;
		}
	} catch (e) {
		console.log(e);
	}
};

export const registration = async ({ email, password }: { email: string; password: string }): Promise<void> => {
	try {
		const response = await axios.post<UserWithTokens>(`${API_URL}/api/user/registration`, {
			email,
			password
		});

		console.log(response);
		if (response.status === 200) {
			const { user, tokens } = response.data;

			User.isAuth = true;
			User.userData = user;
			User.token = tokens.accessToken;
		}
	} catch (e) {
		console.log(e);
	}
};

export const refresh = async (): Promise<void> => {
	try {
		const response = await axios.get<UserWithTokens>(`${API_URL}/api/user/refresh`, { withCredentials: true });

		if (response.status === 200) {
			const { user, tokens } = response.data;

			User.token = tokens.accessToken;
			User.userData = user;
			User.isAuth = true;
		}
	} catch (e) {}
};
