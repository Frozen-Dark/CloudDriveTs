import Auth from "./pages/Auth/Auth.tsx";
import Disk from "./pages/Disk";

export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const DISK_ROUTE = "/disk";

export const authRoutes = [
	{
		path: DISK_ROUTE,
		Component: Disk
	}
];

export const publicRoutes = [
	{
		path: REGISTRATION_ROUTE,
		Component: Auth
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth
	},
	{
		path: "",
		Component: Auth
	}
];
