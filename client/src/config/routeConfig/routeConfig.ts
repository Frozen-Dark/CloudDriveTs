import AccessDeniedPage from "@pages/AccessDeniedPage/AccessDeniedPage";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import { RouteProps } from "react-router-dom";
import Disk from "@pages/Disk/Disk";
import Auth from "@pages/Auth/Auth";

export enum AppRoutes {
	DISK = "disk",
	LOGIN = "login",
	REGISTRATION = "registration",
	NOT_FOUND = "not_found"
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.DISK]: "/disk",
	[AppRoutes.LOGIN]: "/login",
	[AppRoutes.REGISTRATION]: "/registration",
	[AppRoutes.NOT_FOUND]: "*"
};

export const authRouteConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.DISK]: {
		path: RoutePath[AppRoutes.DISK] + "/*",
		Component: Disk
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath[AppRoutes.NOT_FOUND],
		Component: NotFoundPage
	},
	[AppRoutes.LOGIN]: {
		path: RoutePath[AppRoutes.LOGIN],
		Component: Auth
	},
	[AppRoutes.REGISTRATION]: {
		path: RoutePath[AppRoutes.REGISTRATION],
		Component: Auth
	}
};

export const unauthRouteConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.DISK]: {
		path: RoutePath[AppRoutes.DISK],
		Component: AccessDeniedPage
	},
	[AppRoutes.LOGIN]: {
		path: RoutePath[AppRoutes.LOGIN],
		Component: Auth
	},
	[AppRoutes.REGISTRATION]: {
		path: RoutePath[AppRoutes.REGISTRATION],
		Component: Auth
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath[AppRoutes.NOT_FOUND],
		Component: NotFoundPage
	}
};
