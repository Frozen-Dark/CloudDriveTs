import axios from "axios";
import User, { UserAttributes } from "@store/User";
import FolderCore from "@app/providers/FolderProvider/lib/FolderCore";

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

		if (response.status === 200) {
			const { user, tokens } = response.data;

			User.setIsAuth(true);
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

		if (response.status === 200) {
			const { user, tokens } = response.data;

			User.setIsAuth(true);
			User.userData = user;
			User.token = tokens.accessToken;
			FolderCore.setParentId(null);
		}
	} catch (e) {
		console.log(e);
	}
};

export const refresh = async (): Promise<void> => {
	try {
		const response = await axios.get<UserWithTokens>(`${API_URL}/api/user/refresh`, { withCredentials: true });

		if (response && response.status === 200) {
			const { user, tokens } = response.data;

			User.token = tokens.accessToken;
			User.userData = user;
			User.setIsAuth(true);
		}
	} catch (e) {
		console.log(e);
	}
};

export const logout = async (): Promise<void> => {
	try {
		const response = await axios.post<{ message: string }>(`${API_URL}/api/user/logout`, { withCredentials: true });
		if (response.status === 200) {
			console.log(response.data.message);
		}
	} catch (e) {
		console.log(e);
	}

	User.logout();
};
