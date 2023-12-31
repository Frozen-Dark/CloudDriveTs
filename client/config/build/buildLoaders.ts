import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
	const fileLoader = {
		test: /\.(png|jpe?g|gif)$/i, // woff \ woff2 для шрифтов
		use: [
			{
				loader: "file-loader"
			}
		]
	};

	const svgLoader = {
		test: /\.svg$/,
		use: ["@svgr/webpack"]
	};
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: "ts-loader",
		exclude: /node_modules/
	};

	const cssLoader = buildCssLoader(isDev);

	return [fileLoader, svgLoader, typescriptLoader, cssLoader];
}
