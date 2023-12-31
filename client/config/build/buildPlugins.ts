import { WebpackPluginInstance, ProgressPlugin, DefinePlugin, HotModuleReplacementPlugin } from "webpack";
import { BuildOptions } from "./types/config";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

export function buildPlugins({ paths, isDev, apiUrl }: BuildOptions): WebpackPluginInstance[] {
	const plugins = [
		new HtmlWebpackPlugin({
			template: paths.html // шаблон документа
		}),
		new ProgressPlugin(), // отслеживание прогресса сборки
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css[name].[contenthash:8].css"
		}),
		new DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
			__API__: JSON.stringify(apiUrl)
		})
	];

	if (isDev) {
		plugins.push(new HotModuleReplacementPlugin());
		plugins.push(new ReactRefreshWebpackPlugin());
		plugins.push(
			new BundleAnalyzerPlugin({
				openAnalyzer: false
			})
		);
	}

	return plugins;
}
