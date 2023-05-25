import { RouteProps } from "react-router-dom";
import { HistoryPage } from "~/pages/HistoryPage";
import { MainPage } from "~/pages/MainPage";
import { NotFoundPage } from "~/pages/NotFoundPage";
import { ShoppingCartPage } from "~/pages/ShoppingCartPage";


export enum AppRoutes {
	MAIN = "main",
	SHOPPING_CART = "shopping_cart",
	HISTORY = 'history',
	NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: "/",
	[AppRoutes.SHOPPING_CART]: "/shopping-cart",
	[AppRoutes.HISTORY]: "/history",
	[AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.SHOPPING_CART]: {
		path: RoutePath.shopping_cart,
		element: <ShoppingCartPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
	[AppRoutes.HISTORY]: {
		path: RoutePath.history,
		element: <HistoryPage />,
	},
};